'use server'

import { createHash, randomUUID } from 'node:crypto'
import { headers } from 'next/headers'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { whitelistApplications, whitelistTaskProofs } from '@/lib/db/schema'

const TASK_KEYS = ['follow', 'repost', 'tag', 'join'] as const
const walletPattern = /^0x[a-fA-F0-9]{40}$/
const MAX_PROOF_LENGTH = 500
const ALLOWED_PROOF_HOSTS = new Set(['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'])
const RATE_LIMIT_WINDOW_MINUTES = 10
const RATE_LIMIT_MAX_REQUESTS = 12

async function enforceRateLimit() {
  const requestHeaders = await headers()
  const platformAddress = requestHeaders.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  const address = platformAddress || requestHeaders.get('x-real-ip') || 'unknown'
  const key = createHash('sha256').update(address).digest('hex')
  const result = await db.execute<{ request_count: number }>(sql`
    INSERT INTO whitelist_rate_limits (key, window_started_at, request_count)
    VALUES (${key}, now(), 1)
    ON CONFLICT (key) DO UPDATE SET
      request_count = CASE WHEN whitelist_rate_limits.window_started_at <= now() - (${RATE_LIMIT_WINDOW_MINUTES} * interval '1 minute') THEN 1 ELSE whitelist_rate_limits.request_count + 1 END,
      window_started_at = CASE WHEN whitelist_rate_limits.window_started_at <= now() - (${RATE_LIMIT_WINDOW_MINUTES} * interval '1 minute') THEN now() ELSE whitelist_rate_limits.window_started_at END
    RETURNING request_count
  `)
  if (Number(result.rows[0]?.request_count ?? RATE_LIMIT_MAX_REQUESTS + 1) > RATE_LIMIT_MAX_REQUESTS) throw new Error('RATE_LIMITED')
}

function parseProof(value: string) {
  if (!value || value.length > MAX_PROOF_LENGTH) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || !ALLOWED_PROOF_HOSTS.has(url.hostname.toLowerCase()) || url.username || url.password || url.port) return null
    return url
  } catch {
    return null
  }
}

async function verifyProof(taskKey: string, value: string) {
  const url = parseProof(value)
  if (!url) return false
  if (url.pathname === '/' || url.pathname === '') return false
  try {
    const requestInit = { redirect: 'error' as const, signal: AbortSignal.timeout(5000), headers: { 'User-Agent': 'ArchitectsWifHat-proof-check/1.0' } }
    const headResponse = await fetch(url, { ...requestInit, method: 'HEAD' })
    if (headResponse.status >= 200 && headResponse.status < 400) return true
    if (![403, 405, 406, 429, 500, 501, 502, 503].includes(headResponse.status)) return false
    const getResponse = await fetch(url, { ...requestInit, method: 'GET' })
    await getResponse.body?.cancel()
    return getResponse.status >= 200 && getResponse.status < 400
  } catch {
    return false
  }
}

function normalizeProofs(input: { proofs: Record<string, string> }) {
  if (!input || typeof input.proofs !== 'object' || input.proofs === null) throw new Error('INVALID_INPUT')
  return TASK_KEYS.map((key) => ({ key, value: typeof input.proofs[key] === 'string' ? input.proofs[key].trim() : '' }))
}

async function verifyAllProofs(proofs: { key: typeof TASK_KEYS[number]; value: string }[]) {
  return Promise.all(proofs.map(async ({ key, value }) => ({ key, verified: await verifyProof(key, value) })))
}

export async function verifyWhitelistProofs(input: { proofs: Record<string, string> }) {
  await enforceRateLimit()
  const proofs = normalizeProofs(input)
  if (proofs.some(({ value }) => !value)) throw new Error('MISSING_PROOF')
  const results = await verifyAllProofs(proofs)
  return { ok: results.every((result) => result.verified), results }
}

export async function submitWhitelistApplication(input: { wallet: string; proofs: Record<string, string> }) {
  await enforceRateLimit()
  if (!input || typeof input.wallet !== 'string' || input.wallet.length > 100) throw new Error('INVALID_INPUT')
  const wallet = input.wallet.trim().toLowerCase()
  if (!walletPattern.test(wallet)) throw new Error('INVALID_WALLET')
  const proofs = normalizeProofs(input)
  if (proofs.some(({ value }) => !value)) throw new Error('MISSING_PROOF')
  const verified = await verifyAllProofs(proofs)
  if (verified.some(({ verified }) => !verified)) throw new Error('UNVERIFIED_PROOF')

  const id = randomUUID()
  try {
    await db.transaction(async (tx) => {
      await tx.insert(whitelistApplications).values({ id, wallet, status: 'pending' })
      await tx.insert(whitelistTaskProofs).values(proofs.map(({ key, value }) => ({ id: randomUUID(), applicationId: id, taskKey: key, proofUrl: value, verified: true, verifiedAt: new Date() })))
    })
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') throw new Error('WALLET_ALREADY_SUBMITTED')
    throw error
  }
  return { ok: true }
}

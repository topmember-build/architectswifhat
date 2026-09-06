'use server'

import { randomUUID } from 'node:crypto'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { whitelistApplications, whitelistTaskProofs } from '@/lib/db/schema'

const TASK_KEYS = ['follow', 'repost', 'tag', 'join'] as const
const walletPattern = /^0x[a-fA-F0-9]{40}$/

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('UNAUTHORIZED')
  return session.user.id
}

async function verifyProof(taskKey: string, value: string) {
  try {
    const url = new URL(value.trim())
    if (taskKey === 'follow' || taskKey === 'repost' || taskKey === 'tag') {
      if (!['x.com', 'twitter.com', 'www.x.com', 'www.twitter.com'].includes(url.hostname.toLowerCase())) return false
      if (taskKey !== 'follow' && url.pathname === '/') return false
    }
    const response = await fetch(url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(6000) })
    return response.status >= 200 && response.status < 400
  } catch {
    return false
  }
}

export async function verifyWhitelistProofs(input: { proofs: Record<string, string> }) {
  await getUserId()
  const results = await Promise.all(TASK_KEYS.map(async (key) => ({ key, verified: await verifyProof(key, input.proofs[key] ?? '') })))
  return { ok: results.every((result) => result.verified), results }
}

export async function submitWhitelistApplication(input: { wallet: string; proofs: Record<string, string> }) {
  const userId = await getUserId()
  const wallet = input.wallet.trim().toLowerCase()
  if (!walletPattern.test(wallet)) throw new Error('INVALID_WALLET')

  const proofs = TASK_KEYS.map((key) => ({ key, value: input.proofs[key]?.trim() ?? '' }))
  if (proofs.some(({ value }) => !value)) throw new Error('MISSING_PROOF')
  const verified = await Promise.all(proofs.map(({ key, value }) => verifyProof(key, value)))
  if (verified.some((ok) => !ok)) throw new Error('UNVERIFIED_PROOF')

  const existing = await db.select({ id: whitelistApplications.id }).from(whitelistApplications).where(eq(whitelistApplications.userId, userId)).limit(1)
  if (existing.length) throw new Error('ALREADY_APPLIED')

  const id = randomUUID()
  await db.insert(whitelistApplications).values({ id, userId, wallet, status: 'pending' })
  await db.insert(whitelistTaskProofs).values(proofs.map(({ key, value }) => ({ id: randomUUID(), applicationId: id, taskKey: key, proofUrl: value, verified: true, verifiedAt: new Date() })))
  return { ok: true }
}

'use server'

import { randomUUID } from 'node:crypto'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { whitelistApplications, whitelistTaskProofs } from '@/lib/db/schema'

const TASK_KEYS = ['follow', 'repost', 'tag', 'join'] as const
const walletPattern = /^0x[a-fA-F0-9]{40}$/

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
  const results = await Promise.all(TASK_KEYS.map(async (key) => ({ key, verified: await verifyProof(key, input.proofs[key] ?? '') })))
  return { ok: results.every((result) => result.verified), results }
}

export async function submitWhitelistApplication(input: { wallet: string; proofs: Record<string, string> }) {
  const wallet = input.wallet.trim().toLowerCase()
  if (!walletPattern.test(wallet)) throw new Error('INVALID_WALLET')

  const proofs = TASK_KEYS.map((key) => ({ key, value: input.proofs[key]?.trim() ?? '' }))
  if (proofs.some(({ value }) => !value)) throw new Error('MISSING_PROOF')
  const verified = await Promise.all(proofs.map(({ key, value }) => verifyProof(key, value)))
  if (verified.some((ok) => !ok)) throw new Error('UNVERIFIED_PROOF')

  const id = randomUUID()
  try {
    await db.insert(whitelistApplications).values({ id, wallet, status: 'pending' })
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes('unique')) throw new Error('WALLET_ALREADY_SUBMITTED')
    throw error
  }
  await db.insert(whitelistTaskProofs).values(proofs.map(({ key, value }) => ({ id: randomUUID(), applicationId: id, taskKey: key, proofUrl: value, verified: true, verifiedAt: new Date() })))
  return { ok: true }
}

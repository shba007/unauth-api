import { createHmac } from 'node:crypto'
import { $fetch } from 'ofetch'
import JWT from 'jsonwebtoken'

interface GoogleTokensResult {
  id_token: string
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string
}

interface GoogleUserResult {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export function createSignature(payload: any, secret: string) {
  const digest = createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex')

  return digest
}

export function getGoogleOAuthURL(clientId: string, redirectUrl: string) {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

  const options = {
    client_id: clientId,
    redirect_uri: redirectUrl,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(' '),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}

export async function getGoogleUser({ code, client_id, client_secret, redirect_uri }: { code: string; client_id: string; client_secret: string; redirect_uri: string }) {
  const values = {
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: 'authorization_code',
  }

  const qs = new URLSearchParams(values)

  const { access_token, id_token } = await $fetch<GoogleTokensResult>('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: qs.toString(),
  })

  const response = await $fetch<GoogleUserResult>(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${access_token}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${id_token}` },
  })

  return response
}

export function addTimeToNow({ days = 0, hour = 0, minute = 0, second = 0 }: { days?: number; hour?: number; minute?: number; second?: number }): string {
  const millisecond = (((days * 24 + hour) * 60 + minute) * 60 + second) * 1000

  return new Date(Date.now() + millisecond).toISOString().slice(0, -5) + 'Z'
}

enum TokenType {
  'auth' = '30m',
  'refresh' = '',
  'access' = '3m',
}

export function createJWTToken(type: 'auth' | 'refresh' | 'access', id: string, secret: string) {
  const expiresIn = TokenType[type]
  return expiresIn.length > 0 ? JWT.sign({ id }, secret, { expiresIn }) : JWT.sign({ id }, secret)
}

export function mapURL(dict: any, urlMap: any, event: any) {
  const origin = event.node.req.headers.origin ?? 'http://localhost:4000'

  const type = Object.keys(urlMap).find((key) => urlMap[key] === `${origin}/api`)

  return structuredClone(dict)[type]
}

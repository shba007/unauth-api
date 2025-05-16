import JWT from 'jsonwebtoken'
import crypto from 'node:crypto'

export default defineEventHandler<Omit<AuthResponse, 'user'>>(async (event) => {
  const config = useRuntimeConfig()
  const storage = useStorage()
  const { action, phone } = await readBody<{
    action: 'login' | 'register'
    phone: string
  }>(event)

  if (action === undefined || phone === undefined)
    throw createError({
      statusCode: 400,
      statusMessage: 'Action or Phone field is undefined',
    })

  let phoneStatus = (await storage.getItem(`phone:${phone}`)) as PhoneStatus
  // Handle all Errors
  if (phoneStatus && new Date(phoneStatus.retryTimeout).getTime() > Date.now()) {
    // TODO: Send a security alert
    throw createError({ statusCode: 400, statusMessage: 'Retry not expired' })
  }

  try {
    const authHeader = event.node.req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    let user: { id: string; phone: string }

    if (token) {
      const payload = JWT.verify(token, config.authSecret) as { id: string }
      user = (await storage.getItem(`user:${payload.id}`)) as {
        id: string
        phone: string
      }
      user.phone = phone
    } else {
      user = {
        id: crypto.randomUUID(),
        phone,
      }
    }

    await storage.setItem(`user:${user.id}`, user)

    let isUserFound = true
    if (action === 'register') {
      try {
        // Check if user phone number already exists
        const payload = { phone: phone }
        const response = await $fetchs('/user/webhook', {
          baseURL: mapURL(config.apiUrl, config.apiUrl, event),
          method: 'GET',
          headers: {
            Signature: `${createSignature(payload, config.authWebhook)}`,
          },
          query: payload,
        })

        isUserFound = true
      } catch {
        isUserFound = false
      }
    }

    if (action === 'register' && isUserFound) {
      const authToken = createJWTToken('auth', user.id, config.authSecret)
      return { isRegistered: true, token: { auth: authToken } }
    }

    let otp: number | undefined
    /* For Test Credentials */
    if (phone === config.testPhone) {
      otp = Number.parseInt(config.testOTP)
    } else {
      otp = generateOTP()
      if (config.smsSend) await sendOTP(otp, Number.parseInt(phone))
    }

    const retryCount = phoneStatus == null ? 0 : ++phoneStatus.retryCount
    phoneStatus = {
      otp,
      otpTimeout: addTimeToNow({ minute: 5 }),
      retryCount,
      retryTimeout: addTimeToNow(retryCount >= 3 ? { hour: 3 } : { second: 30 }),
      verified: false,
    }

    console.log({ user, phone: phoneStatus })
    await storage.setItem(`phone:${user.phone}`, phoneStatus)

    const authToken = createJWTToken('auth', user.id, config.authSecret)

    return {
      isRegistered: false,
      timeoutAt: phoneStatus.otpTimeout,
      retryTimeoutAt: phoneStatus.retryTimeout,
      token: { auth: authToken },
    }
  } catch (error: any) {
    console.error('Auth sms/otp POST', error)

    if (error == 'jwt expired') throw createError({ statusCode: 401, statusMessage: 'Token Expired' })

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})

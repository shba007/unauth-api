import JWT from 'jsonwebtoken'
import { UserInfo } from './models'

interface JWTToken {
  id: string
  ita: number
  exp: number
}

export function defineProtectedEventHandler<T>(handler: (event: CompatibilityEvent, user: UserInfo) => T | Promise<T>) {
  return defineEventHandler<T>(async (event) => {
    try {
      const config = useRuntimeConfig()
      const storage = useStorage()

      const authHeader = event.node.req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]

      if (token == null)
        throw createError({
          statusCode: 404,
          statusMessage: 'Token Not found',
        })

      try {
        const { id: userId } = JWT.verify(token, config.authSecret) as {
          id: string
        }
        const user = await storage.getItem(`user:${userId}`)

        return handler(event, user)
      } catch (error) {
        const error_ =
          error instanceof JWT.TokenExpiredError
            ? createError({
                statusCode: 401,
                statusMessage: 'Token Expired',
              })
            : createError({
                statusCode: 498,
                statusMessage: 'Invalid Token',
              })
        throw error_
      }
    } catch (error: any) {
      sendError(event, error)
    }
  })
}

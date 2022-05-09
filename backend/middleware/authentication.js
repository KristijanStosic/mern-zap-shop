import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js'
import { isTokenValid } from '../utils/index.js'
import { attachCookiesToResponse } from '../utils/index.js'
import Token from '../models/Token.js'

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken)
      req.user = payload.user
      return next()
    }
    const payload = isTokenValid(refreshToken)

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    })

    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError(
        'Authentication invalid.'
      )
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    })

    req.user = payload.user
    next()
  } catch (error) {
    throw new UnauthenticatedError(
      'Authentication invalid.'
    )
  }
}

/*const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new UnauthenticatedError(
      'Authentication invalid. Please login to access this resource.'
    )
  }

  try {
    const { name, userId, role, createdAt } = isTokenValid({ token })
    req.user = { name, userId, role, createdAt }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid. Token invalid or expired.')
  }
}*/

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(`Unauthorized to access this resource`)
    }
    next()
  }

  /*if(req.user && req.user.role !== 'admin') {
        throw new UnauthorizedError(`Role (${req.user.role}) is not allowed to access this resource`)
    }
    next()*/
}

export { authenticateUser, authorizePermissions }

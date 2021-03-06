import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js'
import { isTokenValid } from '../utils/index.js'

// authentication by passing token via Auth headers
const authenticateUser = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid. Please login to access this route')
  }
  
  const token = authHeader.split(' ')[1]

  try {
    const { name, userId, role, createdAt } = isTokenValid({ token })
    req.user = { name, userId, role, createdAt }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid. No token')
  }
}

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


// Authentication with cookies and access and refresh tokens
/*const authenticateUser = async (req, res, next) => {
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
}*/

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

export { authenticateUser, authorizePermissions }

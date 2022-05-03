import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js'
import { isTokenValid } from '../utils/index.js'

const authenticateUser = async (req, res, next) => {
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

export { authenticateUser, authorizePermissions }

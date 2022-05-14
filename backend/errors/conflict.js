import CustomAPIError from './custom-api.js'
import { StatusCodes } from 'http-status-codes'

class ConflictError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.CONFLICT
  }
}

export default ConflictError

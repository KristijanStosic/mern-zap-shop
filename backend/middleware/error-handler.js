import { StatusCodes } from 'http-status-codes'

const errorHandler = (err, req, res, next) => {
    //console.log(err.message);
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later'
    }

    if(err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        //defaultError.msg = err.message
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    }

    if(err.name === 'CastError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `Invalid mongoose id format. Invalid path: ${err.path}`
    }

    if(err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} field is unique. Try again with new email`
    }

    //res.status(defaultError.statusCode).json({ msg: err })
    res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandler


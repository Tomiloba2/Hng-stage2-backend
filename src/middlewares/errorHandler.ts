import { Request, Response, NextFunction } from "express";
//@desc error handler middleware

const errorStatus = {
    deleted: 204,
    notFound: 404,
    unAuthorised: 401,
    forbidden: 403,
    invalidRequest: 422,
    server_Error: 500
}

const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case errorStatus.deleted:
            return res.json({
                title: Object.keys(errorStatus)[0],
                message: err.message,
                stack: err.stack
            })
            break;

        case errorStatus.notFound:
            return res.json({
                title: Object.keys(errorStatus.notFound)[1],
                message: err.message,
                stack: err.stack
            })
            break;
        case errorStatus.unAuthorised:
            return res.json({
                title: Object.keys(errorStatus)[2],
                message: err.message,
                stack: err.stack
            })
            break;
        case errorStatus.forbidden:
            return res.json({
                title: Object.keys(errorStatus)[3],
                message: err.message,
                stack: err.stack
            })
            break;
        case errorStatus.invalidRequest:
            return res.json({
                title: Object.keys(errorStatus)[4],
                message: err.message,
                stack: err.stack
            })
            break;

        case errorStatus.server_Error:
            return res.json({
                title: Object.keys(errorStatus)[5],
                message: err.message,
                stack: err.stack
            })
            break;

        default:
            break;
    }
    next()
}

export default errorHandler
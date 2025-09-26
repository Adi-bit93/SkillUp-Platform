import ApiError from "../utils/ApiError";

const notFound = (req, res, next) => {
    const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message:err.message,
            errors: err.errors
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };

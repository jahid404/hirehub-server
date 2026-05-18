import { ErrorRequestHandler } from 'express';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  // Format response
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: err,
    stack: config.env === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;

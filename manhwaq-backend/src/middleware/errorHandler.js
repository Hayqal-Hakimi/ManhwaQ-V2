export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const status = err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  res.status(status).json({
    error: err.code || 'INTERNAL_ERROR',
    message: isProduction && status === 500 ? 'Internal server error' : err.message,
  });
};

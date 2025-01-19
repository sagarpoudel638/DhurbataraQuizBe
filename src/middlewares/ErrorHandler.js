import { ResponseClient } from "./ResponseClient.js";

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  ResponseClient({ req, res, statusCode, message });

  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
};

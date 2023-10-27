import { StatusCodes } from "http-status-codes";

// error middleware (500 - occurs when there is an error durng the processing of a request)
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;

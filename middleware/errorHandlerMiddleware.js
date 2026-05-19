import { StatusCodes } from "http-status-codes";
const ErrorHandlermiddleware=(err,req,res,next)=>{
    console.log(err);
    const StatusCode=err.StatusCode|| StatusCodes.INTERNAL_SERVER_ERROR
    const msg=err.message || 'something wrong try again later'
    res.status(500).json({msg});
}
export default ErrorHandlermiddleware;
class ApiError extends Error{
    constructor(
        statusCode,
        message="Somethign went wrong",
        errors=[],
        stack=""

    ){
        super(message);
        this.statusCode=statusCode;
        this.errors=errors;
        this.sucess=false;
        

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }

    }

}

export {ApiError}
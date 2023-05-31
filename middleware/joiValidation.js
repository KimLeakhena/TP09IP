// const registerSchema=require("../schemas/register");
const joiValidationMiddleware =(schema) =>{
     return async(req,res,next)=>{
        try {
            await schema.validateAsync(req.body);
            next();
            
        }
        catch (err) {
            //  console.log(err);
            res.json({
                success:false,
                error:err.details?.[0]?.message || "unknown error"
            });
         }
     
     }
    
}
module.exports=joiValidationMiddleware;
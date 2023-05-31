var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { login } = require('../service/login');
const { register } = require('../service/register');
const registerSchema=require('../schemas/register')
// const { joiValidation}=require('../middleware/joiValid');
const {joiValidation}=require('../middleware/joiValidation');
const joiValidationMiddleware = require('../middleware/joiValidation');
// const { loginSchema, registerSchema } = require('../schemas/index');

//home page 
router.get('/mee', function(req,res,next) {
    // console.log(req.session.jwt);
    if(!req.session?.jwt){
        res.json({
            succes:false,
            error:"you have to signed in"
        })
    }
    var decoded = jwt.verify(req.session.jwt, 'my-jwt-secret');
    console.log(decoded) // bar
    res.json(decoded);
});
//login page
router.post('/login',async (req,res,next) =>{
    if(req.session.jwt){
        res.json({
            succes:false,
            error:"you's already signed in"
        })
    }
    // console.log(req.session);
    const {email, password} = req.body;
    const result = await login(email, password);
    //store token in session cookie
   
    var token = jwt.sign({ email}, 'my-jwt-secret');
    req.session.jwt = token;
    res.json(result);
})
// const joiValidationMiddleware=async(req,res,next)=>{
     
//      try {
//         await registerSchema.validateAsync(req.body);
//         next();
        
//     }
//     catch (err) {
//         //  console.log(err);
//         res.json({
//             success:false,
//             error:err.details?.[0]?.message || "unknown error"
//         });
//      }

// }
//register page
router.post('/register',joiValidationMiddleware(registerSchema),async(req,res,next) =>{
    // // const param = JSON.parse(req.body);
    // try {
    //     await registerSchema.validateAsync(req.body);
        const createdUser = await register(req.body)
        res.json(createdUser);
    // }
    // catch (err) {
    //     console.log(err);
    //     res.json({
    //         success:false,
    //         error:err.details?.[0]?.message || "unknown error"
    //     });
    //  }
    
    
})
// , joiValidation(loginSchema) 
module.exports = router

const Users=require("../model/user");
const bcrypt=require('bcryptjs');

const login = async (email, password) => {
    try {
        
        const user= await Users.findOne({email})
        if(user<0){
            throw 'user not found.'
           
            
        } 
        if( bcrypt.compareSync(password, user?.password )){
            throw "the user's information incorrected."
        }
        return {
            success: true,
            data: user
        }
    } catch (err) {
        return {
            success: false,
            err: err || 'error'
        }
    }
}

module.exports = {
    login
}
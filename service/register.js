const user = require('../model/user')
// const {encryptData} = require('../db/encrypt')
const bcrypt=require('bcryptjs');

const register = async (params) => {
    
    
    try{
        const {email, username, firstname, lastname, password } = params;
        const existed = await user.findOne({ email });
        if(existed){
            throw "Email is already used";
        }
        //encrypt password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("password", salt);
       
        const newUser = {
            email,
            username,
            firstname,
            lastname,
            password:hash
        }

        const createdUser = await user.create(newUser);
        return createdUser
    }catch(err){
        return {
            success: false,
            err: err || 'error'
        }
    }
}

module.exports = {
    register
}
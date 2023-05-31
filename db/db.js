const mongoose =require('mongoose');
module.exports=async () => {
    //canconnect
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/TP09',{
        autoIndex:true,
        serverSelectionTimeoutMS:30000 //default 30second
        });
        console.log("MongoDB connected~");

    }
    //ifwecannotconnecterror
    catch(err){
        console.log("Mongoose:",err);
    }
}

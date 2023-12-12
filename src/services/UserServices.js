const emailSend = require("../utility/EmailHelper");

const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const {EncodeToken} = require("../utility/TokenHelper");

//user otp service
const UserOtpService = async (req) =>{

    try{
       let email = req.params.email ;
       let code = Math.round(Math.floor(100000 + Math.random()* 900000));
       let EmailText = `Your Otp Verification Code Is : ${code}`;
       let EmailSub = "Email Verification" ;
       await emailSend(email , EmailText , EmailSub) ;
       let data = await UserModel.updateOne(
           {email:email} , {$set:{otp:code}},{upsert:true}
       );
        return {message:"6 Digit Otp has been send" , data:data};

    }catch (e) {
        return {message:"fail" , data:e}.toString();
    }

}

//user login verify service
const UserVerifyOtpService = async(req) =>{

  try{
      let email = req.params.email ;
      let otp = req.params.otp ;
      //searching if user exist
      let total = await UserModel.find({email:email , otp:otp}).count("total");

      if(total === 1){
          //reading user id
          let user_id = await UserModel.find({email:email , otp:otp}).select("_id");


          //creating token
           let token = EncodeToken(email , user_id[0]['_id'].toString());

            await UserModel.updateOne({email:email} , {$set:{otp:"0"}});

           return {message:"Valid Otp Code" , token:token};
      }else{
          return { message:"something went wrong"};
      }
  }catch (e) {
      return {message:"failed" , data:e}.toString();
  }
    
}


//user Create and Update Profile service
const SaveProfileService = async(req) =>{

    try{
       let user_id = req.headers['user_id'] ;
       let reqBody = req.body ;
       reqBody.userID = user_id

       let data = await ProfileModel.updateOne(
           {userID:user_id},{$set:reqBody} , {upsert:true}
       );
       return {message:"Data Saved Successfully" , data:data}

    }catch (e) {
        return {message:"Unsuccessful attempt  " , data:e}.toString();
    }

}



//user Read Profile service
const ReadProfileService = async(req) =>{

try{
    let user_id = req.headers['user_id'];
    let data = await ProfileModel.find({userID:user_id});
    return {data:data};
}catch (e) {
    return {e}.toString()
}

}


module.exports ={ UserOtpService,UserVerifyOtpService,SaveProfileService, ReadProfileService };


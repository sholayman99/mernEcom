
//user otp controller
const {UserOtpService, UserVerifyOtpService, SaveProfileService, ReadProfileService} = require("../services/UserServices");

exports.UserOtp = async (req, res) =>{
    let result = await UserOtpService(req);
    return res.status(200).json({status:"success" , result: result });

}

//user login verify controller
exports.UserVerifyOtp = async(req,res) =>{

    let result = await UserVerifyOtpService(req);


    if(result['message'] === "Valid Otp Code"){
        let cookieOption ={
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly:false }
        res.cookie("token" , result['data'] , cookieOption);
        return res.status(200).json({status:"success" , result: result });

    }else{
        return res.status(200).json({status:"success" , result: result });
    }

}

//user logout controller
exports.UserLogout = async(req,res) =>{
    let cookieOption ={
        expires: new Date(Date.now() - 24 * 60 * 60* 1000), httpOnly:false }
    res.cookie("token" , "" , cookieOption);
    return res.status(200).json({status:"success" });

}

//user Create Profile controller
exports.CreateProfile = async(req,res) =>{

    let result = await SaveProfileService(req);
    return res.status(200).json({status:"success" , result: result });
}

//user Update Profile controller
exports.UpdateProfile = async(req,res) =>{

    let result = await SaveProfileService(req);
    return res.status(200).json({status:"success" , result: result });
}

//user Read Profile controller
exports.ReadProfile = async(req,res) =>{

    let result = await ReadProfileService(req);
    return res.status(200).json({status:"success" , result: result });
}


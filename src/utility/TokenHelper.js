const jwt = require("jsonwebtoken");


exports.EncodeToken = (email , user_id) =>{
    let Key = "123-abc-xyz" ;
    let Expire = { expiresIn: "24hrs" }
    let Payload = { email:email , user_id:user_id } ;
    return jwt.sign(Payload , Key , Expire) ;
}


exports.DecodeToken = (token) =>{
    try{
        let Key = "123-abc-xyz" ;
        return jwt.verify(token,Key) ;
    }
    catch (e) {
        return null ;
    }
}
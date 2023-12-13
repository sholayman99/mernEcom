
const WishModel = require("../models/WishModel")


//save wish list service
const SaveWishListService =async(req) =>{
  try{
      let user_id = req.headers.user_id
      let reqBody= req.body;
      console.log(reqBody)
      reqBody.userID = user_id ;
      await WishModel.updateOne(reqBody,{$set:reqBody} , {upsert:true});
      return { status:"success" , message:"Wish List Save Success" };
  }catch (e) {
      return { status:"failed" , message:"Something went wrong" };
  }
}


//remove wish list service
const RemoveWishListService =async(req) =>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body ;
        reqBody.userID = user_id ;
        await WishModel.deleteOne(reqBody);
        return { status:"success" , message:"Delete Wish List Save Success" };
    }catch (e) {
        return { status:"failed" , message:"Something went wrong" };
    }
}



module.exports = { SaveWishListService, RemoveWishListService }
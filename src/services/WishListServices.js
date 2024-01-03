
const WishModel = require("../models/WishModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId ;


//save wish list service
const SaveWishListService =async(req) =>{
  try{
      let user_id = req.headers.user_id
      let reqBody= req.body;
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

//find wish service
const ReadWishListService =async(req) =>{
    try{
        let user_id = req.headers.user_id
        let data = await WishModel.find({userID:user_id});
        return { status:"success" , data:data };
    }catch (e) {
        return { status:"failed" , error:e }.toString();
    }
}

//find wish list service
const WishListService =async(req) =>{
    try{
        let user_id = new ObjectId(req.headers.user_id)
        let matchStage = {$match:{userID:user_id}};
        let joinWithProduct = { $lookup:{
            from:"products", localField:"productID" , foreignField:"_id" , as:"product"
            } };
        let unwindProductStage = {$unwind:"$product"}
        let joinWithBrandStage = {
            $lookup:{ from:"brands" , foreignField:"_id" , localField:"product.brandID" , as:"brand"}
        };
        let joinWithCategoryStage = {
            $lookup:{ from:"categories" , foreignField:"_id" , localField:"product.categoryID" , as:"category"}
        };
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"}
        let data = await WishModel.aggregate([
            matchStage, joinWithProduct,unwindProductStage,joinWithBrandStage,joinWithCategoryStage,
            unwindBrandStage,unwindCategoryStage
        ]);
        return { status:"success" , data:data };
    }catch (e) {
        return { status:"failed" , error:e }.toString();
    }
}





module.exports = { SaveWishListService, RemoveWishListService,ReadWishListService,WishListService }
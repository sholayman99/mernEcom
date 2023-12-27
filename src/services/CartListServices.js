const CartModel = require("../models/CartModel");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId ;


//save wish list service
const SaveCartListService =async(req) =>{
    try{
        let user_id = req.headers.user_id
        let reqBody= req.body;
        reqBody.userID = user_id ;
        await CartModel.create(reqBody);
        return { status:"success" , message:"Cart List Save Success" };
    }catch (e) {
        return { status:"failed" , message:"Something went wrong" };
    }
}


//save wish list service
const UpdateCartListService =async(req) =>{
    try{
        let user_id = req.headers.user_id
        let CartID = req.params.CartID ;
        let reqBody= req.body;
        await CartModel.updateOne({_id:CartID, userID:user_id},{$set:reqBody});
        return { status:"success" , message:"Cart List Update Success" };
    }catch (e) {
        return { status:"failed" , message:"Something went wrong" };
    }
}


//remove wish list service
const RemoveCartListService =async(req) =>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body ;
        reqBody.userID = user_id ;
        await CartModel.deleteOne(reqBody);
        return { status:"success" , message:"Delete Wish List Save Success" };
    }catch (e) {
        return { status:"failed" , message:"Something went wrong" };
    }
}

//find wish list service
const ReadCartListService =async(req) =>{
    try{
        let user_id = new ObjectId(req.headers['user_id']);
        let matchStage = {$match:{userID:user_id}};
        let joinWithProductStage = {$lookup:{
            from:"products" , foreignField:"_id" , localField:"productID" , as:"product"
            }}
        let unwindProductStage = {$unwind:"$product"}
        let joinWithBrandStage = {$lookup:{
                from:"brands" , foreignField:"_id" , localField:"product.brandID" , as:"brand"
            }}
        let unwindBrandStage = {$unwind:"$brand" }
        let joinWithCategoryStage = {$lookup:{
                from:"categories" , foreignField:"_id" , localField:"product.categoryID" , as:"category"
            }}
        let unwindCategoryStage = {$unwind:"$category" };
        let projectStage = {$project:{ "_id":0 ,"categoryID":0,"brandID":0,
                "product._id":0 , "product.brandID":0 ,"product.categoryID":0 ,"brand._id":0,"category._id":0
            }};

        let data = await CartModel.aggregate([
            matchStage,joinWithProductStage,unwindProductStage,joinWithBrandStage,
            unwindBrandStage,joinWithCategoryStage,unwindCategoryStage,projectStage
        ]);

        return { status:"success" , data:data };
    }catch (e) {
        return { status:"failed" , error:e }.toString();
    }
}



module.exports = {SaveCartListService,UpdateCartListService,RemoveCartListService,ReadCartListService};
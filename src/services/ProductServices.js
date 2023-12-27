const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ReviewModel = require("../models/ReviewModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId ;

//product brand service
const BrandListService = async() =>{
  try {
      let data = await BrandModel.find({});
      return  {message:"success" , data:data};
  }
  catch (e) {
      return  {message:"fail" , data:e}.toString();
  }
}

//product category service
const CategoryListService = async() =>{
    try {
        let data = await CategoryModel.find({});
        return {message:"success" , data:data};
    }
    catch (e) {
        return {message:"fail" , data:e}.toString();
    }
}

//product slider list service
const SliderListService = async() =>{
    try {
        let data = await ProductSliderModel.find({});
       return {message:"success" , data:data};
    }
    catch (e) {
        return {message:"fail" , data:e}.toString();
    }
}

//product list by brand service
const ListByBrandService = async(req) =>{

    try {
        let BrandID = new ObjectId(req.params.BrandID) ;
        let matchStage = {$match:{brandID:BrandID}};
        let joinWithBrandStage = {
            $lookup:{ from:"brands" , foreignField:"_id" , localField:"brandID" , as:"brand"}
        };
        let joinWithCategoryStage = {
            $lookup:{ from:"categories" , foreignField:"_id" , localField:"categoryID" , as:"category"}
        };
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let projectionStage = {
            $project:{ "brand._id":0 , "category._id":0 , "categoryID":0 , "brandID":0 }
        }

        let data = await ProductModel.aggregate([
            matchStage,joinWithBrandStage,joinWithCategoryStage , unwindBrandStage,
            unwindCategoryStage , projectionStage
        ])
        return {message:"success" , data:data};
    }
    catch (e) {
        return {message:"fail" , data:e}.toString();
    }

}

// list by category service
const ListByCategoryService = async(req) =>{
    try {
        let CategoryID = new ObjectId(req.params.CategoryID) ;
        let matchStage = {$match:{categoryID:CategoryID}};
        let joinWithBrandStage = {
            $lookup:{ from:"brands" , foreignField:"_id" , localField:"brandID" , as:"brand"}
        };
        let joinWithCategoryStage = {
            $lookup:{ from:"categories" , foreignField:"_id" , localField:"categoryID" , as:"category"}
        };
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let projectionStage = {
            $project:{ "brand._id":0 , "category._id":0 , "categoryID":0 , "brandID":0 }
        }

        let data = await ProductModel.aggregate([
            matchStage,joinWithBrandStage,joinWithCategoryStage , unwindBrandStage,
            unwindCategoryStage , projectionStage
        ])
        return {message:"success" , data:data};
    }
    catch (e) {
        return {message:"fail" , data:e}.toString();
    }
}

// list by remark service
const ListByRemarkService = async(req) =>{
    try {
        let Remark = req.params.Remark ;
        let matchStage = {$match:{remark:Remark}};
        let joinWithBrandStage = {
            $lookup:{ from:"brands" , foreignField:"_id" , localField:"brandID" , as:"brand"}
        };
        let joinWithCategoryStage = {
            $lookup:{ from:"categories" , foreignField:"_id" , localField:"categoryID" , as:"category"}
        };
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let projectionStage = {
            $project:{ "brand._id":0 , "category._id":0 , "categoryID":0 , "brandID":0 }
        }

        let data = await ProductModel.aggregate([
            matchStage,joinWithBrandStage,joinWithCategoryStage , unwindBrandStage,
            unwindCategoryStage , projectionStage
        ])
        return {message:"success" , data:data};
    }
    catch (e) {
        return {message:"fail" , data:e}.toString();
    }
}

//list by similar keyword service
const ListBySimilarService = async(req) =>{
    try {
        let CategoryID = new ObjectId(req.params.CategoryID) ;
        let matchStage = {$match:{categoryID:CategoryID}};
        let limitStage = { $limit: 20 };
        let joinWithBrandStage = {
            $lookup:{ from:"brands" , foreignField:"_id" , localField:"brandID" , as:"brand"}
        };
        let joinWithCategoryStage = {
            $lookup:{ from:"categories" , foreignField:"_id" , localField:"categoryID" , as:"category"}
        };
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let projectionStage = {
            $project:{ "brand._id":0 , "category._id":0 , "categoryID":0 , "brandID":0 }
        };

        let data = await ProductModel.aggregate([
            matchStage , limitStage , joinWithBrandStage , joinWithCategoryStage , unwindBrandStage ,
            unwindCategoryStage , projectionStage
        ]);
        return {message:"success" , data:data};
    }
    catch (e) {
        return {message:"fail" , data:e}.toString();
    }
}

//product details service
const DetailsService = async(req) =>{
   try {
    let ProductID = new ObjectId(req.params.ProductID) ;
    let matchStage = {$match:{ _id:ProductID }};
    let joinWithBrandStage = {
        $lookup:{ from:"brands" , foreignField:"_id" , localField:"brandID" , as:"brand"}
    };
    let joinWithCategoryStage = {
        $lookup:{ from:"categories" , foreignField:"_id" , localField:"categoryID" , as:"category"}
    };
    let joinWithDetailsStage = {
        $lookup:{ from:"productdetails" , foreignField:"productID" , localField:"_id" , as:"details"}
    };

    let unwindBrandStage = {$unwind:"$brand"};
    let unwindCategoryStage = {$unwind:"$category"};
    let unwindDetailsStage = {$unwind:"$details"};
    let projectionStage = {
        $project:{ "brand._id":0 , "category._id":0 , "categoryID":0 , "brandID":0 }
    };

    let data = await ProductModel.aggregate([
        matchStage , joinWithBrandStage , joinWithCategoryStage , joinWithDetailsStage ,
        unwindBrandStage , unwindCategoryStage , unwindDetailsStage , projectionStage
    ]);

    return {message:"success" , data:data};

   } 
   catch (e) {
    return {message:"fail" , data:e}.toString();
   }
}

//list by keyword service
const ListByKeywordService = async(req) =>{

    try{
        let searchRegex = { "$regex": req.params.Keyword , "$options" : "i" } ;
        let searchParams = [ { title: searchRegex } , { shortDes: searchRegex } ] ;
        let searchQuery = { $or: searchParams } ;

        let matchStage = {$match: searchQuery};
        let joinWithBrandStage = {
            $lookup:{ from:"brands" , foreignField:"_id" , localField:"brandID" , as:"brand"}
        };
        let joinWithCategoryStage = {
            $lookup:{ from:"categories" , foreignField:"_id" , localField:"categoryID" , as:"category"}
        };
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};

        let projectionStage = {
            $project:{ "brand._id":0 , "category._id":0 , "categoryID":0 , "brandID":0 }
        };

        let data = await ProductModel.aggregate([
            matchStage , joinWithBrandStage , joinWithCategoryStage ,
            unwindBrandStage , unwindCategoryStage , projectionStage
        ]);

        return {message:"success" , data:data};
    }
    catch (e) {
        return {message:"fail" , data:e}.toString();
    }

}

//list by review service
const ReviewListService = async(req) =>{
   try{

       let ProductID = new ObjectId(req.params.ProductID) ;

       let matchStage = {$match:{productID:ProductID}} ;


       let joinProfileStage = {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
       let unwindStage = {$unwind:"$profile"};
       let projectionStage = {$project: {'des': 1, 'rating': 1, 'profile.cus_name': 1}} ;

       let data = await ReviewModel.aggregate([
           matchStage,joinProfileStage,unwindStage,projectionStage
       ]);
      
       return {message:"success" , data:data};
   }
   catch (e) {
       return {message:"fail" , data:e}.toString();
   }
}

module.exports = {
    BrandListService , CategoryListService ,SliderListService , DetailsService ,  ListByKeywordService,
    ListByBrandService , ListByCategoryService , ListBySimilarService , ListByRemarkService ,
    ReviewListService
}


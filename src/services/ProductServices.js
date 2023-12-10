const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailModel = require("../models/ProductDetailModel");
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
const ListBySimilarService = async(req,res) =>{

}

const ListByKeywordService = async(req,res) =>{

}


const DetailsService = async(req,res) =>{

}

const ReviewListService = async(req,res) =>{

}

module.exports = {
    BrandListService , CategoryListService ,SliderListService , DetailsService ,  ListByKeywordService,
    ListByBrandService , ListByCategoryService , ListBySimilarService , ListByRemarkService ,
    ReviewListService
}


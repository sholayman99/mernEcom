const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController")

//Api end-point for Product

router.get("/ProductBrandList" , ProductController.ProductBrandList);
router.get("/ProductCategoryList" , ProductController.ProductCategoryList);
router.get("/ProductSliderList" , ProductController.ProductSliderList);
router.get("/ProductListByBrand/:BrandID" , ProductController.ProductListByBrand);
router.get("/ProductListByCategory/CategoryID" , ProductController.ProductListByCategory);
router.get("/ProductListBySimilar/:Keyword" , ProductController.ProductListBySimilar);
router.get("/ProductListByKeyword/:Keyword" , ProductController.ProductListByKeyword);
router.get("/ProductListByRemark/:Remark" , ProductController.ProductListByRemark);
router.get("/ProductDetails/:ProductID" , ProductController.ProductDetails);
router.get("/ProductReviewList/:ProductID" , ProductController.ProductReviewList);



module.exports = router ;
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const WishListController = require("../controllers/WishListController");
const CartListController = require("../controllers/CartListController");
const InvoiceController  = require("../controllers/InvoiceController");
const FeatureController = require("../controllers/FeatureController")
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware")

//Api end-point for Product

router.get("/ProductBrandList" , ProductController.ProductBrandList);
router.get("/ProductCategoryList" , ProductController.ProductCategoryList);
router.get("/ProductSliderList" , ProductController.ProductSliderList);
router.get("/ProductListByBrand/:BrandID" , ProductController.ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID" , ProductController.ProductListByCategory);
router.get("/ProductListByRemark/:Remark" , ProductController.ProductListByRemark);
router.get("/ProductListBySimilar/:CategoryID" , ProductController.ProductListBySimilar);
router.get("/ProductListByKeyword/:Keyword" , ProductController.ProductListByKeyword);
router.get("/ProductDetails/:ProductID" , ProductController.ProductDetails);

router.post("/ProductListByFilter" , ProductController.ProductListByFilter);

//Api end-point for Review

router.get("/ProductReviewList/:ProductID" , ProductController.ProductReviewList);
router.post("/CreateReviewList" ,AuthVerifyMiddleware, ProductController.CreateReviewList);

//Api end-point for User
router.get("/UserOtp/:email" , UserController.UserOtp) ;
router.get("/UserVerifyOtp/:email/:otp" , UserController.UserVerifyOtp) ;
router.get("/UserLogout" , AuthVerifyMiddleware ,UserController.UserLogout) ;
router.post("/CreateProfile" , AuthVerifyMiddleware ,UserController.CreateProfile) ;
router.post("/UpdateProfile" , AuthVerifyMiddleware ,UserController.UpdateProfile) ;
router.get("/ReadProfile" , AuthVerifyMiddleware ,UserController.ReadProfile) ;


//Api end-point for Wish List
router.post("/SaveWishList" , AuthVerifyMiddleware ,WishListController.SaveWishList) ;
router.post("/RemoveWishList" , AuthVerifyMiddleware ,WishListController.RemoveWishList) ;
router.get("/ReadWishList" , AuthVerifyMiddleware ,WishListController.ReadWishList) ;
router.get("/WishList" , AuthVerifyMiddleware ,WishListController.WishList) ;

//Api end-point for Cart
router.post("/SaveCartList" , AuthVerifyMiddleware ,CartListController.SaveCartList) ;
router.post("/UpdateCartList/:CartID" , AuthVerifyMiddleware ,CartListController.UpdateCartList) ;
router.post("/RemoveCartList" , AuthVerifyMiddleware ,CartListController.RemoveCartList) ;
router.get("/ReadCartList" , AuthVerifyMiddleware , CartListController.ReadCartList) ;

//Api end-point for Invoice
router.get("/CreateInvoice",AuthVerifyMiddleware , InvoiceController.CreateInvoice );
router.post("/PaymentSuccess/:trxID", InvoiceController.PaymentSuccess );
router.post("/PaymentFail/:trxID", InvoiceController.PaymentFail );
router.post("/PaymentCancel/:trxID", InvoiceController.PaymentCancel );
router.post("/PaymentIPN/:trxID", InvoiceController.PaymentIPN );
router.get("/InvoiceList",AuthVerifyMiddleware , InvoiceController.InvoiceList );
router.get("/InvoiceProductList/:invoiceID",AuthVerifyMiddleware , InvoiceController.InvoiceProductList );

//Api end-point for Feature
router.get("/FeatureList" , FeatureController.FeatureList );

module.exports = router ;
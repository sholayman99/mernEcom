const { BrandListService , CategoryListService ,SliderListService , DetailsService ,
    ListByKeywordService, ListByBrandService , ListByCategoryService , ListBySimilarService ,
    ListByRemarkService , ReviewListService } = require("../services/ProductServices");

//product band list
exports.ProductBrandList=async(req,res) =>{

    let result = await BrandListService();
    return res.status(200).json({result:result});

}

//product category list
exports.ProductCategoryList=async(req,res) =>{

    let result = await CategoryListService();
    return res.status(200).json({result:result});

}

//product slider list
exports.ProductSliderList=async(req,res) =>{

    let result = await SliderListService();
    return res.status(200).json({result:result});

}

//product list by brand
exports.ProductListByBrand=async(req,res) =>{
    let result = await ListByBrandService(req);
    return res.status(200).json({result:result});
}

//product list by category
exports.ProductListByCategory=async(req,res) =>{
    let result = await ListByCategoryService(req);
    return res.status(200).json({result:result});
}

//product list by remark
exports.ProductListByRemark=async(req,res) =>{
    let result = await ListByRemarkService(req);
    return res.status(200).json({result:result});
}

//product list by similar keyword
exports.ProductListBySimilar=async(req,res) =>{
    let result = await ListBySimilarService(req);
    return res.status(200).json({result:result});
}

//product details 
exports.ProductDetails=async(req,res) =>{
    let result = await DetailsService(req);
    return res.status(200).json({result:result});
}

exports.ProductListByKeyword=async(req,res) =>{
    let result = await ListByKeywordService(req);
    return res.status(200).json({result:result});
}


exports.ProductReviewList=async(req,res) =>{
    let result = await ReviewListService(req);
    return res.status(200).json({result:result});
}


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


exports.ProductListBySimilar=async(req,res) =>{

}

exports.ProductListByKeyword=async(req,res) =>{

}


exports.ProductDetails=async(req,res) =>{

}

exports.ProductReviewList=async(req,res) =>{

}


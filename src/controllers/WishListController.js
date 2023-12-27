const {SaveWishListService, RemoveWishListService,ReadWishListService} = require("../services/WishListServices");


//save wish list controller

exports.SaveWishList = async(req, res) =>{
    let result = await SaveWishListService(req) ;
    return res.status(200).json(result)
}

//remove wish list controller

exports.RemoveWishList = async(req, res) =>{
    let result = await RemoveWishListService(req) ;
    return res.status(200).json(result)
}

//find wish list controller
exports.ReadWishList = async(req,res) =>{
    let result = await ReadWishListService(req) ;
    return res.status(200).json(result)
}
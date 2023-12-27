const {
    SaveCartListService,UpdateCartListService,RemoveCartListService,
    ReadCartListService} = require("../services/CartListServices")


//save Cart list controller

exports.SaveCartList = async(req, res) =>{
    let result = await SaveCartListService(req) ;
    return res.status(200).json(result)
}

//update Cart list controller

exports.UpdateCartList = async(req, res) =>{
    let result = await UpdateCartListService(req) ;
    return res.status(200).json(result)
}


//remove Cart list controller

exports.RemoveCartList = async(req, res) =>{
    let result = await RemoveCartListService(req) ;
    return res.status(200).json(result)
}

//find Cart list controller
exports.ReadCartList = async(req,res) =>{
    let result = await ReadCartListService(req) ;
    return res.status(200).json(result)
}
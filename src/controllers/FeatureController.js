const FeatureListService = require("../services/FeatureServices");


exports.FeatureList = async(req,res)=>{
    let result = await  FeatureListService()
    res.status(200).json(result);
}
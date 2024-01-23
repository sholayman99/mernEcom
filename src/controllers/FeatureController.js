const {FeatureListService,LegalListService} = require("../services/FeatureServices");


exports.FeatureList = async(req,res)=>{
    let result = await  FeatureListService();
    res.status(200).json(result);
}

exports.LegalList = async (req,res) =>{
    let result = await  LegalListService(req);
    res.status(200).json(result);
}
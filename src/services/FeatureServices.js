const FeatureModel = require("../models/FeaturesModel");
const LegalModel = require("../models/LegalModel");


const FeatureListService = async()=>{
    try {
        let Feature = await FeatureModel.find({});
        return {status:"success" , data:Feature};
    }catch (e) {
        return {status:"fail" , data:e.message};
    }
}

const LegalListService = async(req)=>{
    try {
        let type = req.params.type
        let data = await LegalModel.find({type:type});
        return {status:"success" , data:data};
    }catch (e) {
        return {status:"fail" , data:e.message};
    }
}

module.exports = {FeatureListService,LegalListService};
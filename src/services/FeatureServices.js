const FeatureModel = require("../models/FeaturesModel");


const FeatureListService = async()=>{
    try {
        let Feature = await FeatureModel.find({});
        return {status:"success" , data:Feature};
    }catch (e) {
        return {status:"fail" , data:e.message};
    }
}

module.exports = FeatureListService;
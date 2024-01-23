import {create}   from "zustand";
import axios from "axios";


const FeatureStore = create((set)=>({
    FeatureList :null,
    FeatureListRequest : async ()=>{
        let res = await axios.get("/api/v1/FeatureList");
        if(res.data['status']==="success"){
            set({FeatureList:res.data['data']});
        }
    },
    LegalList :null,
    LegalListRequest : async (type)=>{
        set({LegalList:null});
        let res = await axios.get(`/api/v1/LegalList/${type}`);
        if(res.data['status']==="success"){
            set({LegalList:res.data['data']});
        }
    },
}))

export default FeatureStore;
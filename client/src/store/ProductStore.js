import {create}   from "zustand";
import axios from "axios";

const ProductStore = create((set)=>({

    BrandList:null ,
    BrandListRequest : async()=>{
        let res = await axios.get("/api/v1/ProductBrandList");
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({BrandList:data['data']})
        }
    },

    CategoryList:null ,
    CategoryListRequest : async()=>{
        let res = await axios.get("/api/v1/ProductCategoryList");
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({CategoryList:data['data']})
        }
    },

    SliderList:null ,
    SliderListRequest : async()=>{
        let res = await axios.get("/api/v1/ProductSliderList");
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({SliderList:data['data']})
        }
    },

    ListByRemark:null ,
    ListByRemarkRequest : async(Remark)=>{
        let res = await axios.get(`/api/v1/ProductListByRemark/${Remark}`);
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({ListByRemark:data['data']})
        }
    },


}))

export  default ProductStore ;


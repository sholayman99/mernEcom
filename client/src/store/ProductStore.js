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
        set({ ListByRemark:null})
        let res = await axios.get(`/api/v1/ProductListByRemark/${Remark}`);
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({ListByRemark:data['data']})
        }
    },
    ListProduct:null ,
    ListByBrandRequest : async(BrandID)=>{
        set({ ListProduct:null})
        let res = await axios.get(`/api/v1/ProductListByBrand/${BrandID}`);
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({ListProduct:data['data']})
        }
    },
    ListByCategoryRequest : async(CategoryID)=>{
        set({ ListProduct:null})
        let res = await axios.get(`/api/v1/ProductListByCategory/${CategoryID}`);
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({ListProduct:data['data']})
        }
    },
    ListByKeywordRequest : async(Keyword)=>{
        set({ ListProduct:null})
        let res = await axios.get(`/api/v1/ProductListByKeyword/${Keyword}`);
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({ListProduct:data['data']})
        }
    },

    ListByFilterRequest : async(postBody)=>{
        set({ ListProduct:null})
        let res = await axios.post(`/api/v1/ProductListByFilter`,postBody);
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({ListProduct:data['data']})
        }
    },

    SearchKeyword:"",
    SetSearchKeyword: async(keyword)=>{
        set({SearchKeyword:keyword})
    },

    Details:null ,
    DetailsRequest : async(id)=>{
        set({ Details:null})
        let res = await axios.get(`/api/v1/ProductDetails/${id}`);
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({Details:data['data']})
        }
    },

    ReviewList:null ,
    ReviewListRequest : async(id)=>{
        set({ ReviewList:null})
        let res = await axios.get(`/api/v1/ProductReviewList/${id}`);
        let data = await res.data['result'] ;
        if(data['status']==="success"){
            set({ReviewList:data['data']})
        }
    },





}))

export  default ProductStore ;


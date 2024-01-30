import {create}   from "zustand";
import axios from "axios";
import {unauthorized} from "../utility/utility.js";


const WishStore = create((set)=>({

    isWishSubmit:false,

    WishSaveRequest:async(productID)=>{

        try {
            set({isCartSubmit:true});
            let res = await axios.post('/api/v1/SaveWishList',{productID:productID});
            let data = await res['data'];
            return data['status'] === 'success';
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false});
        }
    },

    WishList:null,
    WishCount:0,

    WIshListRequest:async()=>{
        try {
            let res = await axios.get('/api/v1/WishList');
            let data = await res['data'];
            if(data['status']==='success'){
                set({WishList:data['data']});
                set({WishCount:data['data'].length})
            }
        }catch (e) {
            unauthorized(e.response.status)
        }
    }

}))

export default WishStore;
import {create}   from "zustand";
import axios from "axios";
import {unauthorized} from "../utility/utility.js";


const CartStore = create((set)=>({
    isCartSubmit:false,

    CartForm:{productID:"",color:"",qty:1,size:""},

    CartFormOnChange:(name,value)=>{
        set((state)=>({
          CartForm:{
              ...state.CartForm,
              [name]:value
          }
        }))
    },

    CartSaveRequest:async(postBody,productID,quantity)=>{
        try {
            set({isCartSubmit:true});
            postBody.productID = productID;
            postBody.qty = quantity
            let res = await axios.post('/api/v1/SaveCartList',postBody);
            let data = await res['data'];
            console.log(data)
            return data['status'] === 'success';
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false});
        }
    },

    CartList:null,
    CartCount:0,

    CartListRequest:async()=>{
        try {
            let res = await axios.get('/api/v1/ReadCartList');
            let data = await res['data'];
            if(data['status']==='success'){
                set({CartList:data['data']});
                set({CartCount:data['data'].length})
            }
        }catch (e) {
            unauthorized(e.response.status)
        }
    }

}))

export default CartStore;
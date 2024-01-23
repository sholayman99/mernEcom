import {create}   from "zustand";
import axios from "axios";
import {getEmail, setEmail} from "../utility/utility.js";


const UserStore = create((set)=>({
   LoginFormValue:{email:""},

   LoginFormRequest:(name,value)=>{
       set((state)=>({
           LoginFormValue:{
               ...state.LoginFormValue,
               [name]:value
           }
       }))
   }
    ,


    isFormSubmit : false,
    UserOtpRequest : async (email)=>{
       set({isFormSubmit:true})
        let res = await axios.get(`/api/v1/UserOtp/${email}`);
        setEmail(email);
        set({isFormSubmit:false})
        return res.data['status'] === "success";
    },

    UserVerifyOtpRequest : async (otp)=>{
        set({isFormSubmit:true})
        let email =getEmail();
        let res = await axios.get(`/api/v1/UserVerifyOtp/${email}/${otp}`);
        set({isFormSubmit:false})
        return res.data['status'] === "success";
    },
}))

export default UserStore;
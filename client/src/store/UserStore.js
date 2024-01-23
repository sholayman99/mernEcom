import {create}   from "zustand";
import axios from "axios";
import {getEmail, setEmail} from "../utility/utility.js";
import Cookies from "js-cookie";


const UserStore = create((set)=>({

    isLogin:()=>{
       return !!Cookies.get("token");
    },

   LoginFormValue:{email:""},
   LoginFormOnChange:(name,value)=>{
       set((state)=>({
           LoginFormValue:{
               ...state.LoginFormValue,
               [name]:value
           }
       }))
   },

    OtpFormValue:{otp:""},
    OtpFormOnChange:(name,value)=>{
        set((state)=>({
            OtpFormValue:{
                ...state.OtpFormValue,
                [name]:value
            }
        }))
    },

    LogoutRequest:async ()=>{
       let res = await axios.get(`/api/v1/UserLogout`);
       return res.data['status'] === "success";
    },

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
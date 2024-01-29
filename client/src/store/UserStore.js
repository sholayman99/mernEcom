import {create}   from "zustand";
import axios from "axios";
import {getEmail, setEmail, unauthorized} from "../utility/utility.js";
import Cookies from "js-cookie";
import ProfileForm from "../components/user/ProfileForm.jsx";


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

    ProfileForm:{cus_add: "",
        cus_city: "", cus_country: "", cus_fax: "", cus_name: "", cus_phone: "", cus_postcode: "",
        cus_state: "", ship_add: "", ship_city: "", ship_country: "", ship_name: "", ship_phone: "",
        ship_postcode: "", ship_state: "",},

    ProfileFormOnChange:(name,value)=>{
        set((state)=>({
          ProfileForm:{
              ...state.ProfileForm,
              [name]:value
          }
        }))
    },

    ProfileDetails:null,
    ProfileDetailsRequest:async()=>{
        try {
          let res = await axios.get('/api/v1/ReadProfile');
          let data = await res.data['result'];
          if(data['status']==='success'){
              set({ProfileForm:data['data'][0]})
              set({ProfileDetails:data['data'][0]})
          }else{
              set({ProfileDetails:[]})
          }

        }catch (e) {
          unauthorized(e.response.status)
        }
    },

    ProfileSaveRequest:async(postBody)=>{
        try {
            let res = await axios.post('/api/v1/UpdateProfile',postBody);
            let data = await res.data['result'];
            return data['status'] === 'success';
        }catch (e) {
            unauthorized(e.response.status)
        }
    }



}))

export default UserStore;
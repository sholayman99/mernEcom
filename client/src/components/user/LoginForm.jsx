import React from "react";
import SubmitButton from "../layout/SubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
  let {LoginFormValue,LoginFormRequest,UserOtpRequest} = UserStore();
 const navigate = useNavigate();
const onFormSubmit = async ()=>{
        if(!ValidationHelper.IsEmail(LoginFormValue.email)){
            toast.error("Valid Email Required")
        }else {
            let res = await UserOtpRequest(LoginFormValue.email);
            res?(navigate("/otp")):(toast.error("Something went wrong!"))
        }
}

  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Your Email</h4>
            <p>
              A verification code will be sent to the email address you provide
            </p>
            <input placeholder="Email Address" value={LoginFormValue.email} type="email" className="form-control"
                 onChange={(e)=>LoginFormRequest("email",e.target.value)}  />
            <SubmitButton onClick={onFormSubmit}  className="btn mt-3 btn-success" text="Next" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

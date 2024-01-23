import React from "react";
import SubmitButton from "../layout/SubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import {useNavigate} from "react-router-dom";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";

const OtpForm = () => {

  let {OtpFormValue,OtpFormOnChange,UserVerifyOtpRequest} = UserStore();

  const navigate = useNavigate();
  const onFormSubmit = async ()=>{
    if(ValidationHelper.IsEmpty(OtpFormValue.otp)){
      toast.error("Valid Otp Required")
    }else {
      let res = await UserVerifyOtpRequest(OtpFormValue.otp);
      res?(navigate("/")):(toast.error("Something went wrong!"))
    }
  }


  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Verification Code</h4>
            <p>
              A verification code has been sent to the email address you provide
            </p>
            <input value={OtpFormValue.otp} placeholder="Verification" type="text" className="form-control"
            onChange={(e)=>OtpFormOnChange("otp",e.target.value)}/>
            <SubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;

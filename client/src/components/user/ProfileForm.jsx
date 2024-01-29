import React, {useEffect} from 'react';
import UserStore from "../../store/UserStore.js";
import ProfileSkeleton from "../../skeleton/Profile-Skeleton.jsx";

const ProfileForm = () => {
    const {ProfileForm,ProfileFormOnChange,ProfileDetails,ProfileDetailsRequest,ProfileSaveRequest} = UserStore();

    useEffect(() => {
        (async ()=>{
            await ProfileDetailsRequest()
        })()
    }, []);


    if(ProfileDetails === null){
        return <ProfileSkeleton />
    }else{
        return (
            <div className="container mt-5">
                <div className="card p-5 rounded-3">
                    <h6>Customer Details</h6>
                    <hr />
                    <div className="row mb-4">
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Name </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Phone </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Fax </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Country </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer City </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer State </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Post Code </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Address</label>
                            <input type="text" className="form-control " />
                        </div>
                    </div>
                    <h6>Shipping Details</h6>
                    <hr />
                    <div className="row">
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping Name </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping Phone </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping Country </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping City </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping State </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping Post Code </label>
                            <input type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping Address</label>
                            <input type="text" className="form-control " />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-3 p-2">
                            <button className="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProfileForm;
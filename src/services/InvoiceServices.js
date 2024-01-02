const CartModel = require("../models/CartModel") ;
const ProfileModel =require("../models/ProfileModel") ;
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PaymentSettingModel");
const mongoose = require("mongoose");
const axios = require("axios");
const ObjectId = mongoose.Types.ObjectId ;


//invoice service
const CreateInvoiceService = async (req) =>{

    try{

        let user_id = new ObjectId(req.headers.user_id) ;
        let cus_email = req.headers.email ;

//=============Step 1:Calculate Total Payable and Vat===============

       let matchStage = {$match:{userID:user_id}};
       let joinProductStage = {$lookup:{
           from:"products" , localField: "productID" , foreignField:"_id" , as:"product"
           }};
       let unwindProductStage = {$unwind:"$product"};
       let CurrentProducts = await CartModel.aggregate([
           matchStage,joinProductStage,unwindProductStage
       ]);

       let totalAmount = 0 ;

       CurrentProducts.forEach((element)=>{
           let price ;
           if(element['product']['discount']){
               price = parseFloat(element['product']['discountPrice']);
           }else{
               price = parseFloat(element['product']['price']);
           }
           totalAmount += parseFloat(element['qty']) * price ;

       });
        let vat = totalAmount * `${process.env.VAT}`;
        let payable = totalAmount + vat;

//=============Step 2: Prepare Customer Details & Shipping Details===============
       let profile = await ProfileModel.aggregate([matchStage]);
       let cus_details = ` Name: ${profile[0]['cus_name']}, Email: ${cus_email} , Address:${profile[0]['cus_add']}, Phone:Address:${profile[0]['cus_phone']}`;
       let ship_details = ` Name: ${profile[0]['ship_name']}, City: ${profile[0]['ship_city']} , Address:${profile[0]['ship_add']}, Phone:Address:${profile[0]['ship_phone']}  `

//=============Step 3: Transition and Others ID===============
        let tran_id = Math.floor(10000000 + Math.random()*90000000);
        let val_id = 0 ; //validation id
        let delivery_status = "pending";
        let payment_status = "pending";


//=============== Step 4: Create Invoice ============================

        let createInvoice = await InvoiceModel.create({
            userID:user_id,
            payable:payable,
            cus_details:cus_details,
            ship_details:ship_details,
            tran_id:tran_id,
            val_id:val_id,
            delivery_status:delivery_status,
            payment_status:payment_status,
            total:totalAmount,
            vat:vat
        });

//=============== Step 5: Create Invoice Product ============================

        let invoice_id = createInvoice['_id'];

        CurrentProducts.forEach(async (element) =>{
          await InvoiceProductModel.create({
              userID:user_id,
              invoiceID:invoice_id,
              productID:element['productID'],
              qty:element['qty'],
              price:element['product']['discount']? element['product']['discountPrice']:element['product']['price'] ,
              color:element['color'],
              size:element['size']
          });
        });

//=============== Step 6: Remove Carts ============================

        await CartModel.deleteMany({userID:user_id});

//=============== Step 6: Prepare for SSL ============================

        let PaymentSettings = await PaymentSettingModel.find({});

        let form = new FormData();

        //payment settings
        form.append("store_id" , PaymentSettings[0]['store_id'])
        form.append("store_passwd" , PaymentSettings[0]['store_passwd'])
        form.append("total_amount" , payable.toString())
        form.append("currency" , PaymentSettings[0]['currency'])
        form.append("tran_id" , tran_id)
        form.append("success_url" , `${PaymentSettings[0]['success_url']}/${tran_id}`)
        form.append("fail_url" , `${PaymentSettings[0]['fail_url']}/${tran_id}`)
        form.append("cancel_url" , `${PaymentSettings[0]['cancel_url']}/${tran_id}`)
        form.append("ipn_url" , `${PaymentSettings[0]['ipn_url']}/${tran_id}`)

        //customer details
        form.append("cus_name",profile[0]['cus_name'] )
        form.append("cus_email",cus_email )
        form.append("cus_add1",profile[0]['cus_add'] )
        form.append("cus_add2",profile[0]['cus_add'] )
        form.append("cus_city",profile[0]['cus_city'] )
        form.append("cus_state",profile[0]['cus_state'] )
        form.append("cus_postcode",profile[0]['cus_postcode'] )
        form.append("cus_country",profile[0]['cus_country'] )
        form.append("cus_phone",profile[0]['cus_phone'] )
        form.append("cus_fax",profile[0]['cus_phone'] )

        //Shipment Information
        form.append("shipping_method","yes" )
        form.append("ship_name",profile[0]['ship_name'] )
        form.append("ship_add1",profile[0]['ship_add'] )
        form.append("ship_add2",profile[0]['ship_add'] )
        form.append("ship_area",profile[0]['ship_area'] )
        form.append("ship_city",profile[0]['ship_city'] )
        form.append("ship_state",profile[0]['ship_state'] )
        form.append("ship_postcode",profile[0]['ship_postcode'] )
        form.append("ship_country",profile[0]['ship_country'] )

        //Product Information
        form.append("product_name", "According to Invoice" )
        form.append("product_category", "According to Invoice" )
        form.append("product_profile", "According to Invoice" )
        // form.append("product_type", "According to Invoice" )
        form.append("product_amount", "According to Invoice" )

        let SSL = await axios.post(PaymentSettings[0]['init_url'],form);

        return {status:"success" , data: SSL.data }

    }catch (e) {
        return {status:"fail" , data:e}.toString()
    }

};

//payment success service
const PaymentSuccessService =async(req) =>{
  try{
      let trxID = req.params.trxID ;
      await InvoiceModel.updateOne({tran_id:trxID} , {payment_status:"success"})
      return {status:"successfully paid"}
  }
  catch (e) {
      return {status:"fail" , data:e}.toString()
  }
}

//payment fail service
const PaymentFailService =async(req) =>{
    try{
        let trxID = req.params.trxID ;
        await InvoiceModel.updateOne({tran_id:trxID} , {payment_status:"fail"})
        return {status:"failed to pay"}
    }
    catch (e) {
        return {status:"fail" , data:e}.toString()
    }
}

//payment cancel service
const PaymentCancelService =async(req) =>{
    try{
        let trxID = req.params.trxID ;
        await InvoiceModel.updateOne({tran_id:trxID} , {payment_status:"cancel"})
        return {status:"cancel payment"}
    }
    catch (e) {
        return {status:"fail" , data:e}.toString()
    }
}

const PaymentIPNService =async(req) =>{
    try{
        let trxID = req.params.trxID ;
        let status = req.body['status']
        await InvoiceModel.updateOne({tran_id:trxID} , {payment_status:status})
        return {status:status}
    }
    catch (e) {
        return {status:"fail" , data:e}.toString()
    }
}




module.exports ={CreateInvoiceService,PaymentSuccessService,PaymentFailService,PaymentCancelService,PaymentIPNService}
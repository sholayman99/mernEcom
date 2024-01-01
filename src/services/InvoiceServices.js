const CartModel = require("../models/CartModel") ;
const ProfileModel =require("../models/ProfileModel") ;
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId ;

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


        return {status:"success" , data: invoice_id}

    }catch (e) {
        return {status:"fail" , data:e}.toString()
    }

};

module.exports ={CreateInvoiceService}
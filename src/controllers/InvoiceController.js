const {CreateInvoiceService,PaymentSuccessService,PaymentFailService,PaymentCancelService,
    PaymentIPNService,InvoiceListService,InvoiceProductListService} = require("../services/InvoiceServices")


//invoice creation controller
exports.CreateInvoice = async(req,res) =>{
    let result = await CreateInvoiceService(req)  ;
    return res.status(200).json(result)
}

//payment Success controller
exports.PaymentSuccess = async(req,res) =>{
    let result = await PaymentSuccessService(req)  ;
    return res.status(200).json(result)
}

//payment Fail controller
exports.PaymentFail = async(req,res) =>{
    let result = await PaymentFailService(req)  ;
    return res.status(200).json(result)
}

//payment Cancel controller
exports.PaymentCancel = async(req,res) =>{
    let result = await PaymentCancelService(req)  ;
    return res.status(200).json(result)
}

//payment ipn controller
exports.PaymentIPN = async(req,res) =>{
    let result = await PaymentIPNService(req)  ;
    return res.status(200).json(result)
}

//invoice list controller
exports.InvoiceList = async(req,res) =>{
    let result = await InvoiceListService(req)  ;
    return res.status(200).json(result)
}

//invoice product list controller
exports.InvoiceProductList = async(req,res) =>{
    let result = await InvoiceProductListService(req)  ;
    return res.status(200).json(result)
}
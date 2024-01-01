const {CreateInvoiceService} = require("../services/InvoiceServices")


exports.CreateInvoice = async(req,res) =>{
    let result = await CreateInvoiceService(req)  ;
    return res.status(200).json(result)
}
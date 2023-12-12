const nodemailer = require("nodemailer");


const emailSend = async(EmailTo, EmailText , EmailSub) =>{
    const transport = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {user: "info@teamrabbil.com", pass: '~sR4[bhaC[Qs'},
        tls: {rejectUnauthorized: false},
    })

    const mailOption ={
        from:"Mern Ecommerce Solution <info@teamrabbil.com>",
        to:EmailTo,
        subject:EmailSub,
        text:EmailText
    }

    return await  transport.sendMail(mailOption);
}

module.exports = emailSend ;
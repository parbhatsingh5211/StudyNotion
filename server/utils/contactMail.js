const nodemailer = require("nodemailer");
require('dotenv').config();

const contactMail = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const options = {
            from: `${email}`,
            to: `${process.env.MAIL_USER}`,
            subject: `${title}`,
            html: `${body}`
        } 

        let info = await transporter.sendMail(options)
        console.log(info);
        return info;

    }catch(error){
        console.log(error.message);
    }
}

module.exports = contactMail;
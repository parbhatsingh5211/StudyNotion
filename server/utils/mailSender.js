const nodemailer = require("nodemailer");
require('dotenv').config();

const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const options = {
            from: 'StudyNotion || CodeSoltar - by Singh',
            to: `${email}`,
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

module.exports = mailSender;
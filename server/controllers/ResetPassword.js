const User = require('../models/User');
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                succes: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            });
        }
        const token = crypto.randomBytes(20).toString("hex");

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 36000,
            },
            {new:true}
        );
        console.log("DETAILS", updatedDetails);

        // create url
        const url = `https://study-notion1-dun.vercel.app//update-password/${token}`;
        
        // send mail containing the url
        await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

        return res.json({
            success: true,
            message: "Email Sent Successfully, Please Check Your Email to Continue Further",
        })

    }catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}

}


// resetPassword
exports.resetPassword = async (req, res) => {
    try{
        const {password, confirmPassword, token} = req.body;

        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: "Password and Confirm Password Does not Match",
            });
        }


        // get userdetails from db using token
        const userDeatils = await User.findOne({token: token});

        // if no entry invalid token
        if(!userDeatils){
            return res.json({
                success: false,
                message: 'Token is Invalid'
            })
        }

        // token time check
        if(!(userDeatils.resetPasswordExpires < Date.now())){
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            })
        }

        // hash password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);

        return res.status(200).json({
            success: true,
            message: `Password Reset Successful`,
        });
    }catch(error){
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
    }
}
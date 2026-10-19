// const { config } = require('dotenv');
const nodemailer=require('nodemailer');

require('dotenv').config();
const mailSender= async (email,title,body)=>{
  try{
    let transporter = nodemailer.createTransport({
      host :process.env.MAIL_HOST,
      auth : {
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
      }
    })
    let info = await transporter.sendMail({
      from: `StudyNotion <${process.env.MAIL_USER || "noreply@studynotion.com"}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })
    console.log("Email sent:", info.messageId);
    return info;
  }
  catch(error){
    console.error("mailSender error:", error.message);
    throw error;
  }
}

module.exports=mailSender;
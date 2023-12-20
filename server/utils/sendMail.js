import nodemailer from "nodemailer";

const sendMail = (email, otp, otpType) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // service: "gmail",
    port: 587, // or the port your SMTP server uses
    secure: false,
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
  });
  
  let mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: `OTP VERIFICATION ${
      !otpType ? "" : `for ${otpType}`
    }`,
    html: `<p>otp  is ${otp}</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return reject(err);
        //   console.log("Error " + err);
      } else {
        return resolve("Otp is sent successfully", info.response);
        //   console.log("Email sent successfully");
      }
    });
  });
};

export default sendMail;

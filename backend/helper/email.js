const nodemailer = require("nodemailer");

exports.sendVerificationMail = function (userData, url) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER_NAME, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    transporter.sendMail(
      {
        from: "No Reply ",
        to: userData.email,
        subject: "Registration Succesfull",
        html: `<h3>Welcome ${userData.username}.</h3> <p>Please verify your account by clicking on the link <a href=${url}>verify</a></p>`,
      },
      function (err, info) {
        // console.log(err, info);
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};

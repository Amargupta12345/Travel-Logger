const nodemailer = require("nodemailer");
exports.sendVerificationMail = function (user, url) {
  return new Promise(function (resolve, reject) {
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.USER_NAME, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻"  No reply', // sender address
        to: user.email, // list of receivers
        subject: "Done The Token genration", // Subject line
        text: user.username, // plain text body
        html: ` Click here to  <a href =${url}> Verify </a> To our account !!!!!!!!`,
      });

      console.log("Message sent: %s", info.messageId);
      if (info.messageId) {
        resolve();
      } else {
        reject();
      }
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(function () {
      reject();
    });
  });

  // async..await is not allowed in global scope, must use a wrapper
};

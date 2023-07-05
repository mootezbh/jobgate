const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const emailTemplateSource = fs.readFileSync(
  path.join(__dirname, "../mail_template/template.hbs"),
  "utf8"
);
const template = handlebars.compile(emailTemplateSource);

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0abc81cc827667",
    pass: "57840109be310f",
  },
});

function sendEmail(token, mail, name) {
  const htmlToSend = template({
    URL: `http://localhost:3000/verify?token=${token}`,
  });
  const mailOptions = {
    from: "test@jobgate.com",
    to: mail,
    subject: `Hello ${name}, please verify your email`,
    html: htmlToSend,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
}
module.exports = sendEmail;

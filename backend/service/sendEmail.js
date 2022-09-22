const nodemailer = require("nodemailer");

sendEmail = async (body) => {
  const { userName, userEmail, userMessage } = body;
  const { NODEMAILER_USER, NODEMAILER_PASSWORD } = process.env;
  console.log(NODEMAILER_USER);
  let transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: NODEMAILER_USER, // generated ethereal user
      pass: NODEMAILER_PASSWORD, // generated ethereal password
    },
  });
  console.log(userName);
  const output = `<div>
  <h2>Ви отримали листа від ${userName},email для контакту ${userEmail}</h2>
  <p>Прислал таке повідомлення:${userMessage}</p>
</div>`;
  const options = {
    from: "mishinmikhail00@meta.ua", // sender address
    to: "misham18092001@gmail.com", // list of receivers
    subject: "You send form from our website", // Subject line
    text: userMessage, // plain text body
    html: output, // html body
  };

  let info = await transporter.sendMail(options);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
("use strict");

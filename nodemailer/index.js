const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service:"gmail",
port: 465,
secure: true, // true for port 465, false for other ports
  auth: {
    user: "tanvigupta050504@gmail.com",
    pass: "jloj fusk flae dsog",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'tanvigupta050504@gmail.com', // sender address
    to: "swapnil881.be22@chitkara.edu.in", // list of receivers
    subject: "Hello", // Subject line
    text: "thank you", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

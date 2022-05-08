import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, html }) => {
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  return transporter.sendMail({
    from: '"ZapShop 👻" <zapshop@gmail.com>', // sender address
    to,
    subject,
    html,
  })
}

export default sendEmail

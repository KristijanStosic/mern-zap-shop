import { sendEmail } from '../utils/index.js'

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetUrl = `${origin}/user/reset-password?token=${token}&email=${email}`

  const message = `<p>Please reset password by clicking on the following link: 
    <a href="${resetUrl}">Reset Password</a></p>`

  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html: `<h4>Hello, ${name}</h4>
    ${message}`,
  })
}

export default sendResetPasswordEmail

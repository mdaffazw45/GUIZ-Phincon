const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.PASSWORD,
  },
})

const sendForgotPasswordEmail = async (to, temporaryPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject: 'Reset Password',
    text: `Your temporary password is: ${temporaryPassword}\nPlease change your password after logging in.`
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Password reset email sent: ', info.response);
  } catch (err) {
    console.error('Error sending password reset email: ', err)
  }
}

module.exports = {
  sendForgotPasswordEmail,
}
const nodemailer = require('nodemailer')
require('dotenv').config()

const SendMailForgotPassword = async (email, otp) => {
  try {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const info = await transport.sendMail({
      from: `"Moho" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Yêu cầu đặt lại mật khẩu',
      text: `Mã OTP để đặt lại mật khẩu của bạn là: ${otp}`,
      html: `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #eef1f7;
      margin: 0;
      padding: 0;
      color: #2d3436;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid #e6e9ef;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #5b4bff, #8e82ff);
      padding: 35px 20px;
      color: #ffffff;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 35px 30px 40px;
    }
    .otp-box {
      text-align: center;
      background-color: #f7f8ff;
      border: 2px dashed #6c5ce7;
      padding: 25px;
      font-size: 28px;
      font-weight: bold;
      color: #574bff;
      border-radius: 12px;
      margin: 25px 0;
      letter-spacing: 6px;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      padding: 22px;
      background-color: #f4f5fa;
      color: #7a7f85;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Yêu cầu đặt lại mật khẩu</h2>
    </div>
    <div class="content">
      <p>Vui lòng sử dụng mã OTP bên dưới:</p>
      <div class="otp-box">${otp}</div>
      <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
    </div>
    <div class="footer">
      Trân trọng,<br/>
      <strong>Moho</strong>
    </div>
  </div>
</body>
</html>
`
    })

    console.log('Forgot password email sent:', info.messageId)
  } catch (error) {
    console.error('Error sending forgot password email:', error)
  }
}

module.exports = SendMailForgotPassword

const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const SendMailForgotPassword = async (email, otp) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

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
                      letter-spacing: 0.5px;
                  }

                  .content {
                      padding: 35px 30px 40px;
                  }

                  .message {
                      font-size: 16px;
                      margin-bottom: 18px;
                      line-height: 1.6;
                      color: #444;
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
                      border-top: 1px solid #e0e3e8;
                  }

                  .footer strong {
                      color: #4b49e5;
                  }
              </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Yêu cầu đặt lại mật khẩu</h2>
                    </div>
                    <div class="content">
                        <div class="message">
                            Bạn hoặc ai đó đã yêu cầu đặt lại mật khẩu cho tài khoản sử dụng địa chỉ email này.
                        </div>
                        <div class="message">
                            Vui lòng sử dụng mã OTP bên dưới để xác nhận và đặt lại mật khẩu:
                        </div>
                        <div class="otp-box">${otp}</div>
                        <div class="message">
                            Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.
                        </div>
                    </div>
                    <div class="footer">
                        Trân trọng,<br/>
                        <strong>Moho</strong>
                    </div>
                </div>
            </body>
            </html>
            `,
        });

        console.log('Forgot password email sent:', info.messageId);
    } catch (error) {
        console.log('Error sending forgot password email:', error);
    }
};

module.exports = SendMailForgotPassword;

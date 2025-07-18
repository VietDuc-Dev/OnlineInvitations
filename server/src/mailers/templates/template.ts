export const verifyEmailTemplate = (
  url: string,
  brandColor: string = "#2563EB"
) => ({
  subject: "Xác nhận địa chỉ email của bạn",
  text: `Vui lòng xác nhận địa chỉ email của bạn bằng cách nhấn vào link: ${url}`,
  html: `
    <html><head><style>
      body, html { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
      .header { background-color: ${brandColor}; font-weight:bold; font-size: 24px; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
      .header img { max-width: 40px; margin-bottom: 10px; }
      .content { padding: 20px; text-align: center; }
      .content h1 { font-size: 24px; color: #333333; }
      .content p { font-size: 16px; color: #666666; margin: 10px 0 20px; }
      .button { display: inline-block; padding: 15px 25px; font-size: 16px; font-weight: bold;  background-color: ${brandColor}; color: #fff!important; border-radius: 5px; text-decoration: none; margin-top: 20px; }
      .footer { font-size: 14px; color: #999999; text-align: center; padding: 20px; }
    </style></head><body>
      <div class="container">
        <div class="header">Thiệp mời Online</div>
        <div class="content">
          <h1>Xác nhận địa chỉ email của bạn</h1>
          <p>Cảm ơn bạn đã đăng ký tài khoản! Vui lòng xác nhận tài khoản bằng cách nhấn vào nút bên dưới.</p>
          <a href="${url}" class="button">Xác nhận tài khoản</a>
          <p>Nếu bạn không tạo tài khoản, vui lòng bỏ qua mail này.</p>
        </div>
        <div class="footer">
          <p>Nếu bạn có bất kỳ câu hỏi nào? <br/>Vui lòng phản hồi với tôi qua email hoặc liên hệ số 0386.631.531.</p>
        </div>
      </div>
    </body></html>
  `,
});

export const passwordResetTemplate = (
  url: string,
  brandColor: string = "#2563EB"
) => ({
  subject: "Thay đổi mật khẩu của bạn",
  text: `Để thay đổi mật khẩu, bạn vui lòng bấm vào link: ${url}`,
  html: `
    <html><head><style>
      body, html { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
      .header { background-color: ${brandColor}; font-size: 24px;  font-weight:bold; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
      .header img { max-width: 40px; margin-bottom: 10px; }
      .content { padding: 20px; text-align: center; }
      .content h1 { font-size: 24px; color: #333333; }
      .content p { font-size: 16px; color: #666666; margin: 10px 0 20px; }
      .button { display: inline-block; padding: 15px 25px; font-size: 16px; font-weight: bold; background-color: ${brandColor};  color: #fff !important; border-radius: 5px; text-decoration: none; margin-top: 20px; }
      .footer { font-size: 14px; color: #999999; text-align: center; padding: 20px; }
    </style></head><body>
      <div class="container">
        <div class="header">Thiệp mời Online</div>
        <div class="content">
          <h1>Thay đổi mật khẩu của bạn</h1>
          <p>Chúng tôi nhận được yêu cầu thay đổi mật khẩu. Nhấn vào nút bên dưới để thực hiện quá trình thay đổi mật khẩu.</p>
          <a href="${url}" class="button">Đổi mật khẩu</a>
          <p>Nếu bạn không yêu cầu thay đổi mật khẩu, bạn có thể bỏ qua email này.</p>
        </div>
        <div class="footer">
          <p>Nếu bạn có bất kỳ câu hỏi nào? <br/>Vui lòng phản hồi với tôi qua email hoặc liên hệ số 0386.631.531.</p>
        </div>
      </div>
    </body></html>
  `,
});

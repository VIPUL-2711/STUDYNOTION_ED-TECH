const emailVerificationTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Email Verification</h2>

      <p>Thank you for registering.</p>

      <p>Your OTP for email verification is:</p>

      <h1 style="color: #2563eb;">${otp}</h1>

      <p>This OTP is valid for 5 minutes.</p>

      <p>If you did not request this OTP, please ignore this email.</p>

      <br />

      <p>Regards,</p>
      <p>StudyNotion Team</p>
    </div>
  </body>
  </html>
  `;
};

module.exports = emailVerificationTemplate;
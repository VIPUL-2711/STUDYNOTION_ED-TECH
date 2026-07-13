const passwordUpdated = (userName) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Password Updated</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">

          <h2 style="color:green;">
              ✅ Password Updated Successfully
          </h2>

          <p>
              Hello <strong>${userName}</strong>,
          </p>

          <p>
              Your account password has been changed successfully.
          </p>

          <p>
              If you made this change, no further action is required.
          </p>

          <p>
              If you did not make this change, please reset your password
              immediately and contact support.
          </p>

          <br>

          <p>
              Regards,<br>
              <strong>StudyNotion Team</strong>
          </p>

      </div>

  </body>
  </html>
  `;
};

module.exports = passwordUpdated;
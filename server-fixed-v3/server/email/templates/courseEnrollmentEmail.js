const courseEnrollmentEmail = (userName, courseName) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Course Enrollment Successful</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">

          <h1 style="color: #2563eb; text-align:center;">
              🎉 Enrollment Successful
          </h1>

          <p>Hello <strong>${userName}</strong>,</p>

          <p>
              Congratulations! You have successfully enrolled in
              <strong>${courseName}</strong>.
          </p>

          <p>
              We're excited to have you join us on this learning journey.
              Start learning and build amazing projects.
          </p>

          <p>
              Best of luck with your course!
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

module.exports = courseEnrollmentEmail;
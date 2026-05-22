import nodemailer from "nodemailer";

const sendEmail =
  async ({
    to,
    subject,
    html,
  }) => {

    try {

      const transporter =
        nodemailer.createTransport({

          host:
            process.env.EMAIL_HOST,

          port:
            process.env.EMAIL_PORT,

          auth: {

            user:
              process.env.EMAIL_USER,

            pass:
              process.env.EMAIL_PASS,
          },
        });

      await transporter.sendMail({

        from:
          `"AI Smart Commerce" <no-reply@aicommerce.com>`,

        to,

        subject,

        html,
      });

      console.log(
        "Email Sent ✅"
      );

    } catch (error) {

      console.log(
        "Email Error ❌"
      );

      console.log(error);
    }
  };

export default sendEmail;
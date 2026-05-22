import twilio from "twilio";

const sendSMS = async (
  phone,
  message
) => {

  try {

    console.log(
      "SID:",
      process.env.TWILIO_ACCOUNT_SID
    );

    console.log(
      "TOKEN:",
      process.env.TWILIO_AUTH_TOKEN
    );

    const client =
      twilio(

        process.env
          .TWILIO_ACCOUNT_SID,

        process.env
          .TWILIO_AUTH_TOKEN
      );

    const sms =
      await client.messages.create({

        body: message,

        from:
          process.env
            .TWILIO_PHONE_NUMBER,

        to: phone,
      });

    console.log(
      "SMS Sent ✅"
    );

    console.log(
      sms.sid
    );

  } catch (error) {

    console.log(
      "SMS Error ❌"
    );

    console.log(
      error.message
    );
  }
};

export default sendSMS;
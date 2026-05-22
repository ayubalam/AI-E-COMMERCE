import twilio from "twilio";

const sendSMS = async (
  phone,
  message
) => {

  try {

    // CHECK ENV
    if (
      !process.env.TWILIO_ACCOUNT_SID ||
      !process.env.TWILIO_AUTH_TOKEN ||
      !process.env.TWILIO_PHONE_NUMBER
    ) {

      console.log(
        "Twilio ENV Missing ❌"
      );

      return;
    }

    // FORMAT PHONE
    let formattedPhone =
      phone;

    // INDIA FORMAT
    if (
      !formattedPhone.startsWith(
        "+91"
      )
    ) {

      formattedPhone =
        `+91${formattedPhone}`;
    }

    console.log(
      "Sending SMS To:",
      formattedPhone
    );

    // CLIENT
    const client =
      twilio(

        process.env
          .TWILIO_ACCOUNT_SID,

        process.env
          .TWILIO_AUTH_TOKEN
      );

    // SEND SMS
    const sms =
      await client.messages.create({

        body: message,

        from:
          process.env
            .TWILIO_PHONE_NUMBER,

        to:
          formattedPhone,
      });

    console.log(
      "SMS Sent ✅"
    );

    console.log(
      "SID:",
      sms.sid
    );

  } catch (error) {

    console.log(
      "SMS Error ❌"
    );

    console.log(error);
  }
};

export default sendSMS;
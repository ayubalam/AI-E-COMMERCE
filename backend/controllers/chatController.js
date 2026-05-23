import axios from "axios";

// AI CHATBOT
export const chatbot =
  async (req, res) => {

    try {

      const { message } =
        req.body;

      // VALIDATION
      if (!message) {

        return res.status(400).json({

          success: false,

          message:
            "Message is required",
        });
      }

      // GEMINI API REQUEST
      const response =
        await axios.post(

          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

          {
            contents: [
              {
                parts: [
                  {
                    text: `
You are an AI ecommerce assistant.

Help users with:
- product recommendations
- ecommerce support
- order help
- payment help
- shopping guidance

User Question:
${message}
                    `,
                  },
                ],
              },
            ],
          }
        );

      // AI REPLY
      const reply =
        response.data
          ?.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text;

      // SUCCESS RESPONSE
      res.json({

        success: true,

        reply:
          reply ||
          "No response from AI",
      });

    } catch (error) {

      console.log(

        error?.response?.data ||

        error.message
      );

      // ERROR RESPONSE
      res.status(500).json({

        success: false,

        message:

          error?.response?.data
            ?.error?.message ||

          "AI quota exceeded. Please try again later.",
      });
    }
  };
export interface SendEmailPayload {
  name: string;
  email: string;
  message: string;
}

export const emailService = {
  sendEmail: async (
    payload: SendEmailPayload,
    env: {
      BREVO_API_KEY: string;
      BREVO_SENDER_EMAIL: string;
      BREVO_SENDER_NAME: string;
      RECEIVER_EMAIL: string;
      BREVO_API_URL: string;
    },
  ) => {
    try {
      const response = await fetch(env.BREVO_API_URL, {
        method: "POST",
        headers: {
          "api-key": env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: env.BREVO_SENDER_NAME,
            email: env.BREVO_SENDER_EMAIL,
          },
          to: [
            {
              email: env.RECEIVER_EMAIL,
              name: "Admin",
            },
          ],
          replyTo: {
            email: payload.email,
            name: payload.name,
          },
          subject: `Portfolio Contact: ${payload.name}`,
          htmlContent: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${payload.name}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Message:</strong></p>
            <p>${payload.message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Brevo API Error:", errorData);
        return {
          success: false,
          message: "Failed to send email via Brevo API",
          statusCode: response.status,
          data: errorData,
        };
      }

      const result = await response.json();
      return {
        success: true,
        message: "Email sent successfully",
        statusCode: 200,
        data: result,
      };
    } catch (error) {
      console.error("Email Service Error:", error);
      return {
        success: false,
        message: "Internal server error while sending email",
        statusCode: 500,
        data: error,
      };
    }
  },
};

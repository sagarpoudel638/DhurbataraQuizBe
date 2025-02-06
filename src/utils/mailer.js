import nodemailer from "nodemailer";

// Create the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASS,
  
  },
  logger: true, 
  debug: true,
});

// Function to send verification email
export const sendVerificationMail = async (toEmail, verificationLink) => {
  try {
    // if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASS) {
    //   throw new Error("SMTP credentials are missing in the environment variables.");
    // }

    console.log(`SMTP User: ${process.env.SMTP_USERNAME}`);
   
    const emailObj = {
      from: `"Support Team" <${process.env.SMTP_USERNAME}>`, // sender address
      to: toEmail, 
      subject: "Verify Your Email", 
      text: `Please verify your email by clicking the link: ${verificationLink}`, // Plain text body for fallback
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
  <h2 style="color: #1f7cec;">Welcome to Dhurbatara Quiz Application! | ध्रुवतारा क्विज एप्लिकेसनमा स्वागत छ!</h2>

  <p style="font-size: 16px;">Hi there, | नमस्ते,</p>
  
  <p style="font-size: 16px;">
    Thank you for signing up. To complete your registration, please verify your email address by clicking the button below. | तपाईंको दर्ता प्रक्रिया पूरा गर्न तलको बटनमा क्लिक गरी आफ्नो इमेल ठेगाना प्रमाणित गर्नुहोस्।
  </p>

  <div style="text-align: center; margin: 20px 0;">
    <a href="${verificationLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #1f7cec; text-decoration: none; border-radius: 5px;">
      Verify Email | इमेल प्रमाणित गर्नुहोस्
    </a>
  </div>

  <p style="font-size: 14px; color: #666;">
    If you did not sign up for this account, you can safely ignore this email. | यदि तपाईंले यो खाता दर्ता गर्नुभएको होइन भने, यस इमेललाई बेवास्ता गर्न सक्नुहुन्छ।
  </p>

  <p style="font-size: 14px; color: #666;">
    Best regards, | शुभेच्छासहित,<br> The Dhurbatara Quiz Support Team | ध्रुवतारा क्विज समर्थन टोली
  </p>
</div>

      `,
    };

    // Send the email
    const info = await transporter.sendMail(emailObj);

    console.log("Message sent: %s", info.messageId);
    return { status: "success", messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { status: "error", message: error.message };
  }
};


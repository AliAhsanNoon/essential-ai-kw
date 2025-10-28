import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    console.log('Attempting to send verification email to:', email);
    
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
    
    const result = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Thank you for signing up! Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
        </div>
      `,
    });

    console.log('Resend API Response:', result);
    console.log('Verification email sent successfully');
    return result;
  } catch (error: any) {
    console.error('Error sending verification email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email: string, firstName: string) => {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Our Platform!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome, ${firstName}!</h2>
          <p>Your email has been successfully verified. You can now enjoy all the features of our platform.</p>
          <p>Thank you for joining us!</p>
        </div>
      `,
    });

    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

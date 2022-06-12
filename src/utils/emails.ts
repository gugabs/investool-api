import sgMail from "@config/sendgrid";

export async function sendActivationCode(to: string, code: string) {
  const email = {
    to,
    from: process.env.SENDGRID_SENDER!,
    subject: "[Investool] Your verification code",
    text: code,
  };

  await sgMail.send(email);
}

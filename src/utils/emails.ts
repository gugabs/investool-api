import sgMail from "@config/sendgrid";

export async function sendActivationCode(to: string, code: string) {
  const email = {
    to,
    from: process.env.SENDGRID_SENDER!,
    subject: "[Investool] Activate your account",
    text: code,
  };

  await sgMail.send(email);
}

export async function sendResetPasswordSteps(to: string) {
  const email = {
    to,
    from: process.env.SENDGRID_SENDER!,
    subject: "[Investool] Reset your password",
    text: "Clique no botão abaixo para redefinir a sua senha:",
  };

  await sgMail.send(email);
}

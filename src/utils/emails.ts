import sgMail from "@config/sendgrid";

export async function sendActivationCode(to: string, code: string) {
  const email = {
    to,
    from: process.env.SENDGRID_SENDER!,
    subject: "[Investool] Seu código de ativação de conta chegou!",
    html: `
      <h1>Ativação de Conta</h1>
      <p>Olá, como vai você?</p>
      <p>Para realizar a ativação da sua conta basta seguir os seguintes passos:</p>
      <ol>
        <li>Clicar no link fornecido neste e-mail;</li>
        <li>Aguardar o redirecionamento para a plataforma;</li>
        <li>Clicar no botão de ativação presente na página para a qual você foi redirecionado(a).</li>
      </ol>
      <a href="http://localhost:3000/activate-account/${code}">Ativar conta</a>
      <hr>
    `,
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

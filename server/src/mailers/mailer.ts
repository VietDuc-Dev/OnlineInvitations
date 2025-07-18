import { config } from "../config/app.config";
import { resend } from "./resendClient";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
  from?: string;
};

const mailer_sender =
  config.NODE_ENV === "development"
    ? `no-reply <onboarding@resend.dev>`
    : `no-reply <${config.MAILER_SENDER}>`;

const getToEmail = (to: string) =>
  config.NODE_ENV === "development" ? "delivered@resend.dev" : to;

export const sendEmail = async ({
  to,
  from = mailer_sender,
  subject,
  text,
  html,
}: Params) =>
  await resend.emails.send({
    from,
    to: getToEmail(to),
    text,
    subject,
    html,
  });

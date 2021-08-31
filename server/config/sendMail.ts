const nodemailer = require('nodemailer');
import { OAuth2Client } from "google-auth-library";

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`
const SENDER_MAIL = `${process.env.MAIL_SENDER_MAIL_ADRESS}`

// send mail

const sendMail = async (to: string, url: string, txt: string) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
  try {
    const access_token = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        access_token
      }
    });

    const mailOptions = {
      from: SENDER_MAIL,
      to: to,
      subject: "Ozzkan Blog",
      html: `
        <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;>
          <h2 style="text-align: center"; text-transform: uppercase; color: teal;>Ozzkan Blog'a hoş geldiniz</h2>
          <p>
            Harika haber! Ozzkan Blog'u kullanmaya başlayabilirsin
            Yapman gereken son bir adım kaldı, email adresini onaylamayı unutma.
          </p>
          <a href=${url} style="background: crimson; text-decoration: none; color: white padding: 10px">${txt}</a>

          <p>Eğer butonu göremiyorsanız aşağıdaki liki kullanarak email adresini onaylayabilirsin.</p>
          <div>${url}</div>

        </div>
      `
    }

    const result = await transport.sendMail(mailOptions);
    return result;

  } catch (err) {
    return err;
  }

}

export default sendMail;
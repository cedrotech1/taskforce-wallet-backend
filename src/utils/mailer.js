import ejs from "ejs";
import path from "path";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

class Email {
  constructor(user, claim = null, url = null, post = null, reason = null) {
    this.to = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.from = process.env.EMAIL_FROM;
    this.url = url;
    this.post = post;
    this.reason = reason;
    this.claim = claim;
  }

  // Send the actual email
  async send(template, subject) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // 1) Render HTML based on an ejs template
    const html = await ejs.renderFile(
      path.join(__dirname, `./../views/email/${template}.ejs`),
      {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        url: this.url,
        post: this.post,
        reason: this.reason,
        claim: this.claim,
        title: this.claim ? this.claim.title : null,
        file: this.claim ? this.claim.file : null,
        description: this.claim ? this.claim.description : null,
        date: this.claim ? this.claim.date : null,
        time: this.claim ? this.claim.time : null,
        status: this.claim ? this.claim.status : null,
      }
    );

    // 2) Define email options
    const mailOptions = {
      to: this.to,
      from: this.from,
      subject,
      html,
    };

    // 3) Send email
    sgMail
      .send(mailOptions)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async sendResetPasswordCode() {
    await this.send("ResetPasswordCode", "Your Reset Password Code ");
  }

  async sendAccountAdded() {
    await this.send("accountAdded", "Your Account on wallete web is Ready");
  }

  async sendNotification() {
    await this.send("Notification", "Your Account notification");
  }
}

export default Email;

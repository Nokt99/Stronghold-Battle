const sgMail = require("@sendgrid/mail");

if (!process.env.SENDGRID_API_KEY) {
    console.error("❌ Missing SENDGRID_API_KEY in environment variables");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    /**
     * Sends a real email using SendGrid.
     * @param {string} to - Recipient email
     * @param {string} subject - Email subject
     * @param {string} body - Plain text body
     */
    async send(to, subject, body) {
        const msg = {
            to,
            from: process.env.SENDGRID_FROM || "no-reply@strongholdbattle.com",
            subject,
            text: body
        };

        try {
            await sgMail.send(msg);
            return { success: true };
        } catch (err) {
            console.error("❌ Email sending failed:", err);
            throw new Error("Email delivery failed");
        }
    }
};

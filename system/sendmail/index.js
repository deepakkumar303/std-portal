const sendGridMailService = require('../lib/sendgrid/index');

// path of email template, dynamic parameters, mail options like from address to address
const sendMail = async(data, mailOptions) => {
    const mailSettings = (mailOptions.mailSettings) ? mailOptions.mailSettings : null;
    const msg = {
        to: mailOptions.to,
        from: (mailOptions.from) ? mailOptions.from : null,
        cc: (mailOptions.cc) ? mailOptions.cc : null,
        bcc: (mailOptions.bcc) ? mailOptions.bcc : null,
        subject: mailOptions.subject,
        text: data,
        html: data,
    };
    const response = await sendGridMailService.sendMail(msg, mailSettings);
    return response;
};

module.exports = {
    sendMail,
};
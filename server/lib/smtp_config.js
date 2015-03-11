Meteor.startup(function() {
    var smtp = {
        replyTo: "no-reply@club2run.com",
        username: "postmaster@sandboxca777ffa20c9481cab4adde03939f2ba.mailgun.org",
        password: "bc32c0d05cb1e3fb65110f959c9590d7",
        server: "smtp.mailgun.org",
        port: 587
    };
    var mailgun = {
        apiKey: "key-5a73f6fcbe8f3385087d841c667880a1",
        domain: "mg.club2run.com"
    };

    process.env.MAIL_URL = "smtp://" + encodeURIComponent(smtp.username) + ":" + encodeURIComponent(smtp.password) + "@" + encodeURIComponent(smtp.server) + ":" + smtp.port;
    process.env.REPLY_TO = smtp.replyTo;
    process.env.MAILGUN_API_KEY = mailgun.apiKey;
    process.env.MAILGUN_DOMAIN = mailgun.domain;
});
Meteor.startup(function() {
    var smtp = {
        replyTo: "no-reply@club2run.com",
        username: "postmaster%40mg.club2run.com",
        password: "55d2201433ebfd5e8f9a6af54eaecf2c",
        server: "smtp.mailgun.org",
        port: 587
    };
    var mailgun = {
        apiKey: "key-5a73f6fcbe8f3385087d841c667880a1",
        domain: "mg.club2run.com"
    };

    process.env.MAIL_URL = "smtp://" + encodeURIComponent(smtp.username) + ":" + encodeURIComponent(smtp.password) + "@" + encodeURIComponent(smtp.server) + ":" + smtp.port + "/";
    process.env.REPLY_TO = smtp.replyTo;
    process.env.MAILGUN_API_KEY = mailgun.apiKey;
    process.env.MAILGUN_DOMAIN = mailgun.domain;

});


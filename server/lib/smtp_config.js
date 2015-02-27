Meteor.startup(function() {
    var smtp = {
        username: 'postmaster@sandboxca777ffa20c9481cab4adde03939f2ba.mailgun.org',
        password: 'bc32c0d05cb1e3fb65110f959c9590d7',
        server: 'smtp.mailgun.org',
        port: 587
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
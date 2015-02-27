Meteor.startup(function() {

    // Support only logging in using email
    Accounts.ui.config({
        passwordSignupFields: 'EMAIL_ONLY'
    });

    // Logout callback
    accountsUIBootstrap3.logoutCallback = function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
        Router.go('/');
    };
});
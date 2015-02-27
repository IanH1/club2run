Accounts.config({
    forbidClientAccountCreation : true
});

Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
});

// Logout callback
accountsUIBootstrap3.logoutCallback = function(error) {
    if (error) {
        console.log("Error: " + error);
    }
    Router.go('/');
};
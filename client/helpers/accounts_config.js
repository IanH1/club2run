Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

// Logout callback
accountsUIBootstrap3.logoutCallback = function(error) {
    if (error) {
        console.log("Error: " + error);
    }
    Router.go('/');
};
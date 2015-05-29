Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
});

// Logout callback
accountsUIBootstrap3.logoutCallback = function(error) {
    if (error) {
        console.log("Exception thrown when logging out: " + error);
    }
    Router.go("home");
};
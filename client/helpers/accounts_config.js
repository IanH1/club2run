Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
});

// In the absence of a login callback use a tracker to determine when the user has changed.
Tracker.autorun(function() {
    var club = null;
    if (Meteor.userId()) {
        if (Meteor.user().profile && Meteor.user().profile.clubIds) {
            club = Club.findOne(Meteor.user().profile.clubIds[0]);
        }
    }
    Session.set("currentClub", club);
});

// Logout callback
accountsUIBootstrap3.logoutCallback = function(error) {
    if (error) {
        console.log("Exception thrown when logging out: " + error);
    }
    Router.go('home');
};
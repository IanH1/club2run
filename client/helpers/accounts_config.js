Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
});

// In the absence of a login callback use a tracker to determine when the user has changed.
Tracker.autorun(function() {
    var club = null;
    if (Meteor.userId()) {
        if (Meteor.user().profile && Meteor.user().profile.clubIds) {
            var clubId = Meteor.user().profile.clubIds[0];

            // Subscribe to the club and all nested documents
            Meteor.subscribe("club", clubId);

            // Fetch the club
            club = Club.findOne(clubId);
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
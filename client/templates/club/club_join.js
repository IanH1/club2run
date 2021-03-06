Template.clubJoin.events({
    'click .join_club': function() {
        Meteor.call('joinClub', Meteor.user(), this, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            } else {
                FlashMessages.sendSuccess("You have successfully joined this club.");
                Router.go("home");
            }
        });
    }
});
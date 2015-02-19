Clubs = new Mongo.Collection('clubs');

// Collection hooks
Meteor.isClient && Clubs.after.update(function (userId, club) {

    // Add a new notification
    Notifications.insert({
        description: "Club updated by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Club successfully updated.");
});

// Client side permissions
Clubs.allow({
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    }
});
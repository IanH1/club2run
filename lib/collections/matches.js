Matches = new Mongo.Collection('matches');

// Collection hooks
Meteor.isClient && Matches.after.insert(function (userId, match) {

    // Add a new notification
    Notifications.insert({
        description: "Match '" + match.opponent + "' created by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Match '" + match.opponent + "' successfully created.");
});
Meteor.isClient && Matches.after.update(function (userId, match) {

    // Add a new notification
    Notifications.insert({
        description: "Match '" + match.opponent + "' updated by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Match '" + match.opponent + "' successfully updated.");
});
Meteor.isClient && Matches.after.remove(function (userId, match) {

    // Add a new notification
    Notifications.insert({
        description: "Match '" + match.opponent + "' deleted by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Match '" + match.opponent + "' successfully deleted.");
});

// Client side permissions
Matches.allow({
    insert: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    remove: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    }
});
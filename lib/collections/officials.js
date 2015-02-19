Officials = new Mongo.Collection('officials');

// Collection hooks
Meteor.isClient && Officials.after.insert(function (userId, official) {

    // Add a new notification
    Notifications.insert({
        description: "Official '" + official.fullName + "' created by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Increment the stats with the number of officials
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {officialCount: 1}});

    // Display confirmation message
    FlashMessages.sendSuccess("Official '" + official.fullName + "' successfully created.");
});
Meteor.isClient && Officials.after.update(function (userId, official) {

    // Add a new notification
    Notifications.insert({
        description: "Official '" + official.fullName + "' updated by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Official '" + official.fullName + "' successfully updated.");
});
Meteor.isClient && Officials.after.remove(function (userId, official) {

    // Add a new notification
    Notifications.insert({
        description: "Official '" + official.fullName + "' deleted by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Decrement the stats with the number of officials
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {officialCount: -1}});

    // Display confirmation message
    FlashMessages.sendSuccess("Official '" + official.fullName + "' successfully deleted.");
});

// Client side permissions
Officials.allow({
    insert: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin'], Roles.GLOBAL_GROUP);
    },
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin'], Roles.GLOBAL_GROUP);
    },
    remove: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin'], Roles.GLOBAL_GROUP);
    }
});
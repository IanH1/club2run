Members = new Mongo.Collection('members');

// Collection hooks
Meteor.isClient && Members.after.insert(function (userId, member) {

    // Add a new notification
    Notifications.insert({
        description: "Member '" + member.fullName + "' created by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Increment the stats with the number of members
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {memberCount: 1}});

    // Display confirmation message
    FlashMessages.sendSuccess("Member '" + member.fullName + "' successfully created.");
});
Meteor.isClient && Members.after.update(function (userId, member) {

    // Add a new notification
    Notifications.insert({
        description: "Member '" + member.fullName + "' updated by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Member '" + member.fullName + "' successfully updated.");
});
Meteor.isClient && Members.after.remove(function (userId, member) {

    // Add a new notification
    Notifications.insert({
        description: "Member '" + member.fullName + "' deleted by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Decrement the stats with the number of members
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {memberCount: -1}});

    // Display confirmation message
    FlashMessages.sendSuccess("Member '" + member.fullName + "' successfully deleted.");
});

// Client side permissions
Members.allow({
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
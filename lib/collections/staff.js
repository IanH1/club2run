Staff = new Mongo.Collection('staff');

// Collection hooks
Meteor.isClient && Staff.after.insert(function (userId, staff) {

    // Add a new notification
    Notifications.insert({
        description: "Staff '" + staff.fullName + "' created by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Staff '" + staff.fullName + "' successfully created.");
});
Meteor.isClient && Staff.after.update(function (userId, staff) {

    // Add a new notification
    Notifications.insert({
        description: "Staff '" + staff.fullName + "' updated by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Staff '" + staff.fullName + "' successfully updated.");
});
Meteor.isClient && Staff.after.remove(function (userId, staff) {

    // Add a new notification
    Notifications.insert({
        description: "Staff '" + staff.fullName + "' deleted by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Staff '" + staff.fullName + "' successfully deleted.");
});

// Client side permissions
Staff.allow({
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
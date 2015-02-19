Tasks = new Mongo.Collection('tasks');

// Collection hooks
Meteor.isClient && Tasks.after.insert(function (userId, task) {

    // Add a new notification
    Notifications.insert({
        description: "Task '" + task.fullName + "' created by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Increment the stats with the number of tasks
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {taskCount: 1}});

    // Display confirmation message
    FlashMessages.sendSuccess("Task '" + task.fullName + "' successfully created.");
});
Meteor.isClient && Tasks.after.update(function (userId, task) {

    // Add a new notification
    Notifications.insert({
        description: "Task '" + task.fullName + "' updated by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Task '" + task.fullName + "' successfully updated.");
});
Meteor.isClient && Tasks.after.remove(function (userId, task) {

    // Add a new notification
    Notifications.insert({
        description: "Task '" + task.fullName + "' deleted by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Decrement the stats with the number of tasks
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {taskCount: -1}});

    // Display confirmation message
    FlashMessages.sendSuccess("Task '" + task.fullName + "' successfully deleted.");
});

// Collection hooks
Tasks.allow({
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
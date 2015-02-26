Notifications = new Mongo.Collection('notifications');

Meteor.methods({
    insertNotification: function(notification) {

        // Check user permissions
        if (!Meteor.user()) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        notification = _.extend(notification,
            {read: false},
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the notification is valid
        check(notification, Schema.NotificationSchema);

        // Insert the new notification
        var notificationId = Notifications.insert(notification);

        return {
            _id: notificationId
        };
    }
});

// Client side permissions
Notifications.allow({
    insert: function(userId) {
        return !! userId;
    },
    update: function(userId) {
        return false;
    },
    remove: function(userId) {
        return !! userId;
    }
});
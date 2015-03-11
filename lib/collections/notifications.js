Notifications = new Mongo.Collection('notifications');

Meteor.methods({
    insertNotification: function(notification) {

        // Check user permissions
        if (!Meteor.user()) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        notification = _.extend(notification,
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()}
        );

        // Check if the notification is valid
        check(notification, Schema.Notification);

        // Insert the new notification
        var notificationId = Notifications.insert(notification);

        return {
            _id: notificationId
        };
    },
    deleteNotification: function(notificationId) {

        // Check user permissions
        if (!Meteor.user()) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing message
        Notifications.remove(notificationId);
    }
});
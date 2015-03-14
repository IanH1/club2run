// Create the collection
Notification = new Mongo.Collection('notification');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new notification.
         */
        insertNotification: function(notification) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
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
            var notificationId = Notification.insert(notification);

            return { _id: notificationId };
        },

        /*
         * Delete a notification.
         */
        deleteNotification: function(notification) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], Meteor.user().profile.clubId) || notification.createdBy !== Meteor.userId()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the notification
            Notification.remove(notification._id);
        }
    });
}
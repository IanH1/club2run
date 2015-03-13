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
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            notification = _.extend(notification,
                {clubId: Club.find()},
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
        deleteNotification: function(notificationId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the notification
            Notification.remove(notificationId);
        }
    });
}
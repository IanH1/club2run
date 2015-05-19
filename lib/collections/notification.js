// Create the collection
Notification = new Mongo.Collection("notification");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Create and insert a new notification.
         *
         * @param   eventId -
         * @param   description -
         * @param   userId -
         *
         * @return  The id of the inserted notification
         */
        createAndInsertNotification: function(eventId, description, userId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "manager"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Create the new notification
            var notification = {
                description: description,
                eventId: eventId,
                userId: userId,
                clubId: Meteor.user().profile.currentClubId,
                createdOn: new Date(),
                createdBy: Meteor.userId()
            };

            // Check if the notification is valid
            check(notification, Schema.Notification);

            // Insert the notification
            var notificationId = Notification.insert(notification);

            return { _id: notificationId };
        },

        /*
         * Delete a notification.
         *
         * @param   notification - the notification to delete
         */
        deleteNotification: function(notification) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], notification.clubId) || notification.userId !== Meteor.userId()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the notification
            Notification.remove(notification._id);
        }
    });
}
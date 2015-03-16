// Create the collection
Message = new Mongo.Collection("message");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new message.
         */
        insertMessage: function(message) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            message = _.extend(message,
                {clubId: Meteor.user().profile.clubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the message is valid
            check(message, Schema.Message);

            // Insert the new message
            var messageId = Message.insert(message);

            return { _id: messageId };
        },

        /*
         * Delete a message.
         */
        deleteMessage: function(message) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], Meteor.user().profile.clubId) || message.createdBy !== Meteor.userId()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the message
            Message.remove(message._id);
        }
    });
}
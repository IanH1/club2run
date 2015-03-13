Message = new Mongo.Collection('message');

Meteor.methods({
    insertMessage: function(message) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        message = _.extend(message,
            {clubId: Club.find()},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the message is valid
        check(message, Schema.Message);

        // Insert the new message
        var messageId = Message.insert(message);

        return {
            _id: messageId
        };
    },
    deleteMessage: function(messageId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the message
        Message.remove(messageId);
    }
});
Messages = new Mongo.Collection('messages');

Meteor.methods({
    insertMessage: function(message) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
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
        check(message, Schema.MessageSchema);

        // Insert the new message
        var messageId = Messages.insert(message);

        return {
            _id: messageId
        };
    },
    deleteMessage: function(messageId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing message
        Messages.remove(messageId);
    }
});

// Client side permissions
Messages.allow({
    insert: function(userId) {
        return false;
    },
    update: function() {
        return false;
    },
    remove: function() {
        return false;
    }
});
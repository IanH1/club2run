Messages = new Mongo.Collection('messages');

// Collection hooks
Meteor.isClient && Messages.after.insert(function (userId, message) {

    // Increment the stats with the number of messages
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {messageCount: 1}});
});
Meteor.isClient && Messages.after.remove(function (userId, message) {

    // Decrement the stats with the number of messages
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {messageCount: -1}});
});

// Client side permissions
Messages.allow({
    insert: function(userId) {
        return !! userId;
    },
    update: function(userId) {
        return !! userId;
    },
    remove: function(userId) {
        return !! userId;
    }
});
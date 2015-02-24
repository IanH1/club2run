Messages = new Mongo.Collection('messages');

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
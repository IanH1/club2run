Notifications = new Mongo.Collection('notifications');

// Client side permissions
Notifications.allow({
    insert: function(userId) {
        return !! userId;
    },
    remove: function(userId) {
        return !! userId;
    }
});
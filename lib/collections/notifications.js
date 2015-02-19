Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    insert: function(userId) {
        return !! userId;
    },
    remove: function(userId) {
        return !! userId;
    }
});
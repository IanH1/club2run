Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    insert: function(userId) {
        return !! userId;
    }
});
Notifications = new Mongo.Collection('notifications');

// Collection hooks
Meteor.isClient && Notifications.after.insert(function (userId, notification) {

    // Increment the stats with the number of notifications
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {notificationCount: 1}});
});
Meteor.isClient && Notifications.after.remove(function (userId, notification) {

    // Decrement the stats with the number of notifications
    Clubs.direct.update(Meteor.user().profile.clubId, {$inc: {notificationCount: -1}});
});

// Client side permissions
Notifications.allow({
    insert: function(userId) {
        return !! userId;
    },
    remove: function(userId) {
        return !! userId;
    }
});
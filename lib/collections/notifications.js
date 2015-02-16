Notifications = new Mongo.Collection('notifications');

createNotification = function(summary) {
    Notifications.insert({
        clubId: Meteor.user().profile.clubId,
        summary: summary,
        read: false
    });
};
Officals = new Mongo.Collection('officals');

Meteor.isClient && Officals.after.insert(function (userId, offical) {

    // Add a notification
    Notifications.insert({
        description: 'Offical ' + offical.fullName + ' created by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of officals
    Clubs.update(Meteor.user().profile.clubId, {$inc: {officalCount: 1}});
});

Meteor.isClient && Officals.after.remove(function (userId, offical) {

    // Add a notification
    Notifications.insert({
        description: 'Offical ' + offical.fullName + ' deleted by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of officals
    Clubs.update(Meteor.user().profile.clubId, {$inc: {officalCount: -1}});
});
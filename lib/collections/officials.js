Officials = new Mongo.Collection('officials');

Meteor.isClient && Officials.after.insert(function (userId, official) {

    // Add a notification
    Notifications.insert({
        description: 'Official ' + official.fullName + ' created by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of officials
    Clubs.update(Meteor.user().profile.clubId, {$inc: {officialCount: 1}});
});

Meteor.isClient && Officials.after.remove(function (userId, official) {

    // Add a notification
    Notifications.insert({
        description: 'Official ' + official.fullName + ' deleted by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of officials
    Clubs.update(Meteor.user().profile.clubId, {$inc: {officialCount: -1}});
});
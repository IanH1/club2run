Matches = new Mongo.Collection('matches');

Meteor.isClient && Matches.after.insert(function (userId, match) {

    // Add a notification
    Notifications.insert({
        description: 'Match ' + match.opponent + ' created by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of matches
    Clubs.update(Meteor.user().profile.clubId, {$inc: {matchCount: 1}});
});

Meteor.isClient && Matches.after.remove(function (userId, match) {

    // Add a notification
    Notifications.insert({
        description: 'Match ' + match.opponent + ' deleted by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of matches
    Clubs.update(Meteor.user().profile.clubId, {$inc: {matchCount: -1}});
});
Teams = new Mongo.Collection('teams');

Meteor.isClient && Teams.after.insert(function (userId, team) {

    // Add a notification
    Notifications.insert({
        description: 'Team ' + team.name + ' created by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of teams
    Clubs.update(Meteor.user().profile.clubId, {$inc: {teamCount: 1}});
});

Meteor.isClient && Teams.after.remove(function (userId, team) {

    // Add a notification
    Notifications.insert({
        description: 'Team ' + team.name + ' deleted by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of teams
    Clubs.update(Meteor.user().profile.clubId, {$inc: {teamCount: -1}});
});
Members = new Mongo.Collection('members');

Meteor.isClient && Members.after.insert(function (userId, member) {

    // Add a notification
    Notifications.insert({
        description: 'Member ' + member.fullName + ' created by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of members
    Clubs.update(Meteor.user().profile.clubId, {$inc: {memberCount: 1}});
});

Meteor.isClient && Members.after.remove(function (userId, member) {

    // Add a notification
    Notifications.insert({
        description: 'Member ' + member.fullName + ' deleted by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of members
    Clubs.update(Meteor.user().profile.clubId, {$inc: {memberCount: -1}});
});
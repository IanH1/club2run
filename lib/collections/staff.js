Staff = new Mongo.Collection('staff');

Meteor.isClient && Staff.after.insert(function (userId, staff) {

    // Add a notification
    Notifications.insert({
        description: 'Staff ' + staff.fullName + ' created by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of staff
    Clubs.update(Meteor.user().profile.clubId, {$inc: {teamCount: 1}});
});

Meteor.isClient && Staff.after.remove(function (userId, staff) {

    // Add a notification
    Notifications.insert({
        description: 'Staff ' + staff.fullName + ' deleted by ' + Meteor.user().profile.fullName,
        read: false,
        userId: userId
    });

    // Increment the stats with the number of staff
    Clubs.update(Meteor.user().profile.clubId, {$inc: {teamCount: -1}});
});
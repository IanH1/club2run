Meteor.publish('tasks', function() {
    return Tasks.find({clubId: Meteor.users.findOne(this.userId).profile.clubId}, {sort: {createdOn: -1}});
});

Meteor.publish('notifications', function() {
    return Notifications.find({clubId: Meteor.users.findOne(this.userId).profile.clubId}, {sort: {createdOn: -1}});
});

Meteor.publish('club', function() {
    return Clubs.find({_id: Meteor.users.findOne(this.userId).profile.clubId});
});
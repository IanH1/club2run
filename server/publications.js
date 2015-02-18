Meteor.publish('tasks', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId) {
            return Tasks.find({clubId: clubId}, {sort: {createdOn: -1}});
        }
    }
    return this.ready();
});

Meteor.publish('notifications', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId) {
            return Notifications.find({clubId: clubId}, {sort: {createdOn: -1}});
        }
    }
    return this.ready();
});

Meteor.publish('club', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId) {
            return Clubs.find({_id: clubId});
        }
    }
    return this.ready();
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({_id: this.userId}, {fields: {'status': 1}});
});
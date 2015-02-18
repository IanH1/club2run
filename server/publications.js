Meteor.publish('club', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId) {
            return Clubs.find({_id: clubId});
        }
    }
    return this.ready();
});

Meteor.publish('matches', function() {
    return Matches.find({}, {sort: {startDateTime: -1}});
});

Meteor.publish('members', function() {
    return Members.find({}, {sort: {fullName: 1}});
});

Meteor.publish('messages', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId) {
            return Messages.find({clubId: clubId}, {sort: {createdOn: 1}});
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

Meteor.publish('officals', function() {
    return Officals.find({}, {sort: {fullName: 1}});
});

Meteor.publish('staff', function() {
    return Staff.find({}, {sort: {fullName: 1}});
});

Meteor.publish('tasks', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId) {
            return Tasks.find({clubId: clubId}, {sort: {createdOn: -1}});
        }
    }
    return this.ready();
});

Meteor.publish('teams', function() {
    return Teams.find({}, {sort: {name: 1}});
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({_id: this.userId}, {fields: {'status': 1}});
});
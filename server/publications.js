Meteor.publish('profilePictures', function() {
    return ProfilePictures.find();
});

Meteor.publish('club', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Clubs.find({_id: clubId});
        }
    }
    return this.ready();
});

Meteor.publish('events', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Events.find({clubId: clubId}, {sort: {startDateTime: -1}});
        }
    }
    return this.ready();
});

Meteor.publish('members', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Members.find({clubId: clubId}, {sort: {fullName: 1}});
        }
    }
    return this.ready();
});

Meteor.publish('messages', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Messages.find({clubId: clubId}, {sort: {createdOn: -1}});
        }
    }
    return this.ready();
});

Meteor.publish('notifications', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Notifications.find({createdBy: this.userId, clubId: clubId}, {sort: {createdOn: -1}});
        }
    }
    return this.ready();
});

Meteor.publish('officials', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Officials.find({clubId: clubId}, {sort: {fullName: 1}});
        }
    }
    return this.ready();
});

Meteor.publish(null, function() {
    return Meteor.roles.find({});
})

Meteor.publish('staff', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Staff.find({clubId: clubId}, {sort: {fullName: 1}});
        }
    }
    return this.ready();
});

Meteor.publish('tasks', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Tasks.find({clubId: clubId}, {sort: {createdOn: -1}});
        }
    }
    return this.ready();
});

Meteor.publish('teams', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Teams.find({clubId: clubId}, {sort: {name: 1}});
        }
    }
    return this.ready();
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({_id: this.userId}, {fields: {'status': 1}});
});
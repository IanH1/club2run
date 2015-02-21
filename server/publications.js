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

Meteor.publish('matches', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Clubs.find({_id: clubId});
        }
    }
    return Matches.find({clubId: clubId}, {sort: {startDateTime: -1}});
});

Meteor.publish('members', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Members.find({clubId: clubId}, {sort: {fullName: 1}});
        }
    }
});

Meteor.publish('messages', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Messages.find({clubId: clubId}, {sort: {createdOn: 1}});
        }
    }
    return this.ready();
});

Meteor.publish('notifications', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Notifications.find({clubId: clubId}, {sort: {createdOn: -1}});
        }
    }
    return this.ready();
});

Meteor.publish('officals', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Clubs.find({_id: clubId});
        }
    }
    return Officals.find({clubId: clubId}, {sort: {fullName: 1}});
});

Meteor.publish(null, function (){
    return Meteor.roles.find({})
})

Meteor.publish('staff', function() {
    if (this.userId) {
        var clubId = Meteor.users.findOne(this.userId).profile.clubId;
        if (clubId && Roles.userIsInRole(this.userId, ['club_user'], Roles.GLOBAL_GROUP)) {
            return Clubs.find({_id: clubId});
        }
    }
    return Staff.find({clubId: clubId}, {sort: {fullName: 1}});
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
            return Clubs.find({_id: clubId});
        }
    }
    return Teams.find({clubId: clubId}, {sort: {name: 1}});
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({_id: this.userId}, {fields: {'status': 1}});
});
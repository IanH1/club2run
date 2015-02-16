Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId}, {fields: {"clubId": 1}});
    } else {
        this.ready();
    }
});

Meteor.publish('events', function(options) {
    check(options, {
        sort: Object
    });
    return Events.find({clubId: Meteor.users.findOne(this.userId).clubId}, options);
});

Meteor.publish('members', function(options) {
    check(options, {
        sort: Object
    });
    return Members.find({clubId: Meteor.users.findOne(this.userId).clubId}, options);
});

Meteor.publish('officals', function(options) {
    check(options, {
        sort: Object
    });
    return Officals.find({clubId: Meteor.users.findOne(this.userId).clubId}, options);
});

Meteor.publish('staff', function(options) {
    check(options, {
        sort: Object
    });
    return Staff.find({clubId: Meteor.users.findOne(this.userId).clubId}, options);
});

Meteor.publish('teams', function(options) {
    check(options, {
        sort: Object
    });
    return Teams.find({clubId: Meteor.users.findOne(this.userId).clubId}, options);
});
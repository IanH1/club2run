Template.dashboard.helpers({
    users: function() {
        return Meteor.users.find({}, {limit: 8});
    }
});
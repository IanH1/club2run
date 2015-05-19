Template.dashboard.helpers({
    latestUsers: function() {
        return Meteor.users.find( {}, { sort: { 'profile.createdOn': -1 }}, { limit: 8 });
    }
});
Template.header.helpers({
    notifications: function() {
        return Notifications.find({clubId: Meteor.user().profile.clubId, read: false});
    },
    notificationCount: function(){
        return Notifications.find({clubId: Meteor.user().profile.clubId, read: false}).count();
    }
});

Template.header.events({
    'click a': function() {
        Notifications.update(this._id, {$set: {read: true}});
    }
});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function() {
        Router.go('profile');
    }
});
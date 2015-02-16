Template.header.helpers({
    notifications: function() {
        return Notifications.find({clubId: Meteor.user().profile.clubId, read: false});
    },
    notificationCount: function(){
        return Notifications.find({clubId: Meteor.user().profile.clubId, read: false}).count();
    },
    tasks: function() {
        return Tasks.find({clubId: Meteor.user().profile.clubId, complete: {$ne: true}});
    },
    taskCount: function(){
        return Tasks.find({clubId: Meteor.user().profile.clubId, complete: {$ne: true}}).count();
    }
});

Template.header.events({
    'click .notification-item': function() {
        Notifications.update(this._id, {$set: {read: true}});
    }
});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function() {
        Router.go('profile');
    }
});
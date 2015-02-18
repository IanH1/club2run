Template.header.helpers({
    notifications: function() {
        return Notifications.find({read: false}, {sort: {createdOn: -1}});
    },
    tasks: function() {
        return Tasks.find({complete: {$ne: true}});
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
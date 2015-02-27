Template.header.helpers({
    notifications: function() {
        return Notifications.find({read: false}, {sort: {createdOn: -1}});
    },
    messages: function() {
        return Messages.find({}, {sort: {createdOn: -1}});
    },
    tasks: function() {
        return Tasks.find({complete: {$ne: true}});
    }
});

Template.notificationWidget.events({
    'click .notification-item': function() {
        Meteor.call('readNotification', this._id, function(error, result) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    }
});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function() {
        Router.go('profile');
    }
});
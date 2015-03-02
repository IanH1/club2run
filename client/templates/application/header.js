Template.header.helpers({
    notifications: function(options) {
        if (options instanceof Spacebars.kw && options.hash) {
            if (options.hash.limit != null) {
                limit = options.hash.limit;
            }
            if (options.hash.unreadFirst != null) {
                order = { read: 1, createdOn: -1 };
            }
        } else {
            limit = 0;
            order = { createdOn: -1 };
        }
        return Notifications.find({}, {limit: limit, sort: order});
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
Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function() {
        Router.go("profile");
    }
});

Template.messageDropdown.helpers({
    messageBoards: function() {
        return MessageBoard.find({}, { sort: { createdOn: -1 } });
    }
});

Template.notificationDropdown.helpers({
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
        return Notification.find({}, { limit: limit, sort: order });
    }
});
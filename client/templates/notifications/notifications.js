var notificationClass = function() {
    if (!this.read) {
        return 'new';
    } else {
        return '';
    }
};

var readNotification = function() {
    Meteor.call('readNotification', this._id, function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
    });
};

Template.notificationPanel.created = function() {
    this.hideRead = new ReactiveVar();
};

Template.notificationPanel.helpers({
    notificationClass: notificationClass,
    notifications: function() {
        if (Template.instance().hideRead.get()) {
            return Notifications.find({read: {$ne: true}}, {createdOn: -1});
        } else {
            return Notifications.find({}, {createdOn: -1});
        }
    },
    hideRead: function() {
        return Template.instance().hideRead.get();
    }
});

Template.notificationPanel.events({
    'click .notification-item': readNotification,
    'click .notification-delete': function() {
        var notificationId = this._id;
        bootbox.confirm("Are you sure you want to delete this notification?", function(result) {
            if (result) {
                Meteor.call('deleteNotification', notificationId, function (error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    }
                });
            }
        });
    },
    "change .hide-read input": function(event, template) {
        template.hideRead.set(event.target.checked);
    }
});

Template.notificationDropdown.helpers({
    notificationClass: notificationClass,
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
    }
});

Template.notificationDropdown.events({
    'click .notification-item': readNotification()
});
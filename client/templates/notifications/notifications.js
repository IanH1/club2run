Template.notificationPanel.helpers({
    notifications: function() {
        return Notifications.find({});
    },
    meeting: function() {
        if (this.meeting && this.meeting.meetingId) {
            return Events.findOne(this.meeting.meetingId);
        }
    }
});

Template.notificationPanel.events({
    'click .notification-delete': function() {
        var notificationId = this._id;
        bootbox.confirm("Are you sure you want to delete this notification?", function(result) {
            if (result) {
                Meteor.call('deleteNotification', notificationId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    }
                });
            }
        });
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
        return Notifications.find({}, { limit: limit, sort: order });
    }
});
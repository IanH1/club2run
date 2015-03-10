Template.notificationPanel.helpers({
    notifications: function() {
        return Notifications.find();
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

Template.calendarPanel.rendered = function() {
    var fc = this.$('.fc');
    this.autorun(function() {
        Events.find();
        fc.fullCalendar('refetchEvents');
    });
};

Template.calendarPanel.helpers({
    headerOptions: function() {
        return {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        }
    },
    eventClickHandler: function() {
        return function(reqEvent,jsEvent,view) {
            Router.go('eventEdit', {_id: reqEvent.id});
        };
    },
    dayClickHandler: function() {
        return function(date, allDay, jsEvent, view) {
            Session.set("eventDate", date.format());
            Router.go('eventCreate');
        };
    },
    events: function() {
        return function(start, end, tz, callback) {
            var events = Events.find().map(function(event) {
                return {
                    id: event._id,
                    title: event.description,
                    start: moment(event.startDateTime),
                    end: moment(event.endDateTime),
                    allDay: event.endDateTime == null
                };
            });
            callback(events);
        };
    }
});

Template.calendarPanel.events({
    'click .refresh': function(event, template) {
        template.$('.eventCalendar').fullCalendar('refetchEvents');
    }
});

Template.messagePanel.helpers({
    messages: function() {
      return Messages.find({}, { sort: {createdOn: -1} });
    },
    member: function() {
        return Meteor.users.findOne(this.createdBy);
    },
    ownMessage: function() {
        return Meteor.userId() === this.createdBy;
    }
});

Template.messagePanel.events({
    'submit form': function(event, template) {
        event.preventDefault();

        Meteor.call('insertMessage', { message: template.find(".form-control").value}, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
        template.find(".form-control").value = "";
    },
    'click .delete-message': function(event) {
        event.preventDefault();

        var messageId = this._id;
        bootbox.confirm("Are you sure you want to delete this message?", function(result) {
            if (result) {
                Meteor.call('deleteMessage', messageId, function (error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    }
                });
            }
        });
    }
});

Template.taskPanel.created = function() {
    this.hideCompleted = new ReactiveVar();
};

Template.taskPanel.helpers({
    tasks: function() {
        if (Template.instance().hideCompleted.get()) {
            return Tasks.find({complete: {$ne: true}});
        } else {
            return Tasks.find();
        }
    },
    taskCountOutstanding: function () {
        return Tasks.find({complete: {$ne: true}}).count();
    },
    taskClass: function() {
        if (this.complete) {
            return 'done';
        } else {
            return '';
        }
    },
    ownTask: function() {
        return Meteor.userId() === this.createdBy
    },
    hideCompleted: function() {
        return Template.instance().hideCompleted.get();
    }
});

Template.taskPanel.events({
    'submit form': function(event, template) {
        event.preventDefault();

        Meteor.call('insertTask', {text: template.find(".form-control").value}, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
        template.find(".form-control").value = "";
    },
    'click .task-item': function(event) {
        var taskId = this._id;
        Meteor.call('toggleTask', taskId, event.target.checked, function (error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    },
    'click .task-delete': function() {
        var taskId = this._id;
        bootbox.confirm("Are you sure you want to delete this task?", function(result) {
            if (result) {
                Meteor.call('deleteTask', taskId, function (error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    }
                });
            }
        });
    },
    "change .hide-completed input": function(event, template) {
        template.hideCompleted.set(event.target.checked);
    }
});
var cssStatusClass = function(availability) {
    if (availability === "Accepted") {
        return "primary";
    } else if (availability === "Tentative") {
        return "warning";
    } else if (availability === "Declined") {
        return "danger";
    } else {
        return "default";
    }
};

var updateMeetingInvite = function(meetingId, availability) {
    Meteor.call("updateMeetingInvite", meetingId, availability, function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
    });
};

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
    var eventCalendar = this.$('.eventCalendar');
    this.autorun(function() {
        eventCalendar.fullCalendar('refetchEvents');
    });
};

Template.calendarPanel.helpers({
    headerOptions: function() {
        return {
            left: "title",
            center: "",
            right: "today prev,next agendaDay,agendaWeek,month"
        }
    },
    eventClickHandler: function() {
        return function(calEvent) {
            Session.set('showEventId', calEvent._id);
            Session.set('showEventType', calEvent.type);
            Session.set('showEventModal', true);
        };
    },
    dayClickHandler: function() {
        return function(date, allDay, jsEvent, view) {
        };
    },
    events: function() {
        return function(start, end, tz, callback) {
            var events = [];

            // Add the fixture events
            Fixture.find().forEach(function(fixture) {
                events.push({
                    id: fixture._id,
                    title: fixture.opponent,
                    allDay: false,
                    start: moment(fixture.startDateTime),
                    end: moment(fixture.endDateTime),
                    type: 'fixture'
                })
            });

            // Add the meeting events
            Meeting.find().forEach(function(meeting) {
                events.push({
                    id: meeting._id,
                    title: meeting.subject,
                    allDay: false,
                    start: moment(meeting.startDateTime),
                    end: moment(meeting.endDateTime),
                    type: 'meeting'
                })
            });

            // Add the training events
            Training.find().forEach(function(training) {
                events.push({
                    id: training._id,
                    title: training.teamId,
                    allDay: false,
                    start: moment(training.startDateTime),
                    end: moment(training.endDateTime),
                    type: 'training'
                })
            });

            callback(events);
        };
    },
    showEventModal: function() {
        return Session.get("showEventModal") === true;
    },
    showEventType: function() {
        return Session.get("showEventType");
    }
});

Template.calendarPanel.events({
    'click .refresh': function(event, template) {
        template.$('.eventCalendar').fullCalendar('refetchEvents');
    }
});

Template.eventFixtureModal.helpers({
    fixture: function() {
        if (Session.get("showEventId")) {
            return Fixture.findOne(Session.get("showEventId"));
        }
    },
    team: function() {
        if (Session.get("showEventId")) {
            var fixture = Fixture.findOne(Session.get("showEventId"));
            if (fixture && fixture.teamId) {
                return Team.findOne(fixture.teamId);
            }
        }
    }
});

Template.eventFixtureModal.events({
    'click [data-dismiss="modal"]': function() {
        Session.set('showEventId', null);
        Session.set('showEventType', null);
        Session.set('showEventModal', false);
    }
});

Template.eventMeetingModal.helpers({
    meeting: function() {
        if (Session.get("showEventId")) {
            return Meeting.findOne(Session.get("showEventId"));
        }
    },
    attendee: function() {
        if (this.userId) {
            return Meteor.users.findOne(this.userId);
        }
    },
    attendeeStatusClass: function() {
        return cssStatusClass(this.availability);
    },
    currentUserInvite: function() {
        if (Session.get("showEventId")) {
            var meeting = Meeting.findOne(Session.get("showEventId"));
            if (meeting && meeting.attendeeIds) {
                return _.find(meeting.attendeeIds, function(attendee) {
                    if (attendee.userId === Meteor.userId()) {
                        return attendee;
                    }
                });
            }
        }
    },
    currentUserStatusClass: function() {
        if (Session.get("showEventId")) {
            var meeting = Meeting.findOne(Session.get("showEventId"));
            if (meeting && meeting.attendeeIds) {
                var invite = _.find(meeting.attendeeIds, function(attendee) {
                    if (attendee.userId === Meteor.userId()) {
                        return attendee;
                    }
                });
                return cssStatusClass(invite.availability);
            }
        }
    }
});

Template.eventMeetingModal.events({
    'click .accept': function() {
        updateMeetingInvite(Session.get("showEventId"), "Accepted");
    },
    'click .tenative': function() {
        updateMeetingInvite(Session.get("showEventId"), "Tentative");
    },
    'click .decline': function() {
        updateMeetingInvite(Session.get("showEventId"), "Declined");
    },
    'click [data-dismiss="modal"]': function() {
        Session.set('showEventId', null);
        Session.set('showEventType', null);
        Session.set('showEventModal', false);
    }
});

Template.messagePanel.helpers({
    messages: function() {
      return Messages.find({}, { sort: {createdOn: -1} });
    },
    user: function() {
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
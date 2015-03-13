var cssAvailabilityClass = function(availability) {
    if (availability === "Accepted" || availability === "Available") {
        return "primary";
    } else if (availability === "Tentative") {
        return "warning";
    } else if (availability === "Declined" || availability === "Unavailable") {
        return "danger";
    } else {
        return "default";
    }
};

var updateFixtureInvite = function(teamSelectionId, availability) {
    Meteor.call("updateTeamSelectionInvite", teamSelectionId, availability, function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
    });
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
        return Notification.find();
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
                var team = Team.findOne(training.teamId);
                events.push({
                    id: training._id,
                    title: team.name + " Training",
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
    },
    official: function() {
        if (this.valueOf()) {
            return Official.findOne(this.valueOf());
        }
    },
    teamSelection: function() {
        if (Session.get("showEventId")) {
            return TeamSelection.findOne({ fixtureId: Session.get("showEventId") });
        }
    },
    player: function() {
        if (this.userId) {
            return Meteor.users.findOne(this.userId);
        }
    },
    playerStatusClass: function() {
        return cssAvailabilityClass(this.availability);
    },
    currentUserInvite: function() {
        if (Session.get("showEventId")) {
            var teamSelection = TeamSelection.findOne({ fixtureId: Session.get("showEventId") });
            if (teamSelection && teamSelection.squad) {
                return _.find(teamSelection.squad, function(player) {
                    if (player.userId === Meteor.userId()) {
                        return player;
                    }
                });
            }
        }
    },
    currentUserStatusClass: function() {
        if (Session.get("showEventId")) {
            var teamSelection = TeamSelection.findOne({ fixtureId: Session.get("showEventId") });
            if (teamSelection && teamSelection.squad) {
                var invite = _.find(teamSelection.squad, function(player) {
                    if (player.userId === Meteor.userId()) {
                        return player;
                    }
                });
                return cssAvailabilityClass(invite.availability);
            }
        }
    }
});

Template.eventFixtureModal.events({
    'click .accept': function() {
        var teamSelection = TeamSelection.findOne({ fixtureId: Session.get("showEventId") });
        if (teamSelection) {
            updateFixtureInvite(teamSelection._id, "Available");
        }
    },
    'click .tenative': function() {
        var teamSelection = TeamSelection.findOne({ fixtureId: Session.get("showEventId") });
        if (teamSelection) {
            updateFixtureInvite(teamSelection._id, "Tentative");
        }
    },
    'click .decline': function() {
        var teamSelection = TeamSelection.findOne({ fixtureId: Session.get("showEventId") });
        if (teamSelection) {
            updateFixtureInvite(teamSelection._id, "Unavailable");
        }
    },
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
        return cssAvailabilityClass(this.availability);
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
                return cssAvailabilityClass(invite.availability);
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

Template.eventTrainingModal.helpers({
    training: function() {
        if (Session.get("showEventId")) {
            return Training.findOne(Session.get("showEventId"));
        }
    },
    team: function() {
        if (Session.get("showEventId")) {
            var training = Training.findOne(Session.get("showEventId"));
            if (training && training.teamId) {
                return Team.findOne(training.teamId);
            }
        }
    },
    coach: function() {
        if (this.valueOf()) {
            return Staff.findOne(this.valueOf());
        }
    }
});

Template.eventTrainingModal.events({
    'click [data-dismiss="modal"]': function() {
        Session.set('showEventId', null);
        Session.set('showEventType', null);
        Session.set('showEventModal', false);
    }
});

Template.messagePanel.helpers({
    messages: function() {
      return Message.find({}, { sort: {createdOn: -1} });
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
                Meteor.call('deleteMessage', messageId, function(error) {
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
            return Task.find({complete: {$ne: true}});
        } else {
            return Task.find();
        }
    },
    taskCountOutstanding: function() {
        return Task.find({complete: {$ne: true}}).count();
    },
    taskClass: function() {
        return this.complete ? "done" : "";
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

        Meteor.call('insertTask', {details: template.find(".form-control").value}, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
        template.find(".form-control").value = "";
    },
    'click .task-item': function(event) {
        var taskId = this._id;
        Meteor.call('toggleTaskCompletion', taskId, event.target.checked, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    },
    'click .task-delete': function() {
        var taskId = this._id;
        bootbox.confirm("Are you sure you want to delete this task?", function(result) {
            if (result) {
                Meteor.call('deleteTask', taskId, function(error) {
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
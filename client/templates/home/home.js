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

var updateFixtureInvite = function(squadSelection, availability) {
    Meteor.call("updateSquadSelectionInvite", squadSelection, availability, function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
    });
};

var updateMeetingInvite = function(meeting, availability) {
    Meteor.call("updateMeetingInvite", meeting, availability, function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
    });
};

Template.notificationPanel.helpers({
    notifications: function() {
        return Notification.find();
    },
    fixture: function() {
        return Fixture.findOne(this.fixtureId);
    },
    team: function() {
        var fixture = Fixture.findOne(this.fixtureId);
        if (fixture) {
            return Team.findOne(fixture.teamId);
        }
    }
});

Template.notificationPanel.events({
    'click .respond': function() {
        Session.set('showEventId', this.fixtureId);
        Session.set('showEventType', this.type);
        Session.set('showEventModal', true);
    },
    'click .delete': function() {
        var notification = this;
        bootbox.confirm("Are you sure you want to delete this notification?", function(result) {
            if (result) {
                Meteor.call('deleteNotification', notification, function(error) {
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
            right: "today prev,next agendaWeek,month"
        }
    },
    eventClickHandler: function() {
        return function(calendarEvent) {
            Session.set('showEventId', calendarEvent._id);
            Session.set('showEventType', calendarEvent.type);
            Session.set('showEventModal', true);
        };
    },
    dayClickHandler: function() {
        return function(date, allDay, jsEvent, view) {
            bootbox.confirm("Are you sure you want to create an event on " + date.format("MMMM Do YYYY, HH:mm:ss") + "?", function(result) {
                if (result) {
                    Session.set("eventDate", date.toDate());
                    Router.go("eventCreate");
                }
            });
        };
    },
    events: function() {
        return function(start, end, tz, callback) {
            var events = [];
            CalendarEvent.find().forEach(function(calendarEvent) {
                events.push({
                    id: calendarEvent._id,
                    title: calendarEvent.title,
                    allDay: false,
                    start: moment(calendarEvent.startDateTime),
                    end: moment(calendarEvent.endDateTime)
                })
            });

            // Add the fixture events
            //Fixture.find().forEach(function(fixture) {
            //    events.push({
            //        id: fixture._id,
            //        title: fixture.opponent,
            //        allDay: false,
            //        start: moment(fixture.startDateTime),
            //        end: moment(fixture.endDateTime),
            //        type: 'fixture'
            //    })
            //});
            //
            //// Add the meeting events
            //Meeting.find().forEach(function(meeting) {
            //    events.push({
            //        id: meeting._id,
            //        title: meeting.subject,
            //        allDay: false,
            //        start: moment(meeting.startDateTime),
            //        end: moment(meeting.endDateTime),
            //        type: 'meeting'
            //    })
            //});
            //
            //// Add the training events
            //Training.find().forEach(function(training) {
            //    var team = Team.findOne(training.teamId);
            //    events.push({
            //        id: training._id,
            //        title: team.name + " Training",
            //        allDay: false,
            //        start: moment(training.startDateTime),
            //        end: moment(training.endDateTime),
            //        type: 'training'
            //    })
            //});
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

Template.messagePanel.helpers({
    messageBoards: function() {
        return MessageBoard.find({}, { sort: {createdOn: -1} });
    }
});

Template.messageBoard.helpers({
    fixture: function() {
        return Fixture.findOne(this.fixtureId);
    },
    team: function() {
        var fixture = Fixture.findOne(this.fixtureId);
        if (fixture) {
            return Team.findOne(fixture.teamId);
        }
    }
});

Template.messageBoard.events({
    'click .show-message-board': function(event, template) {

        // Ensure we scroll to the end of the message list
        Meteor.setTimeout(function() {
            var scrollPanel = template.find('.direct-chat-messages');
            scrollPanel.scrollTop = scrollPanel.scrollHeight;
        }, 500);
    }
});

Template.messageBoardMessages.helpers({
    user: function() {
        return Meteor.users.findOne(this.createdBy);
    },
    ownMessage: function() {
        return Meteor.userId() === this.createdBy;
    }
});

Template.messageBoardMessages.events({
    'submit form': function(event, template) {
        event.preventDefault();
        Meteor.call('insertMessage', event.target.message.value, this, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
        event.target.message.value = "";

        // Ensure we scroll to the end of the message list
        Meteor.setTimeout(function() {
            var scrollPanel = template.find('.direct-chat-messages');
            scrollPanel.scrollTop = scrollPanel.scrollHeight;
        }, 500);
    }
});
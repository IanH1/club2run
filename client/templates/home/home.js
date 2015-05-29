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

            // Fetch a list of calendar events that belong to the club
            CalendarEvent.find().forEach(function(calendarEvent) {
                if (calendarEvent.type === "fixture") {
                    var homeTeam = Team.findOne(calendarEvent.fixture.homeTeamId);
                    var awayTeam = Team.findOne(calendarEvent.fixture.awayTeamId);
                    events.push({
                        id: calendarEvent._id,
                        type: calendarEvent.type,
                        title: 'Fixture - ' + homeTeam.name + " V " + awayTeam.name,
                        allDay: false,
                        start: moment(calendarEvent.startDateTime),
                        end: moment(calendarEvent.endDateTime),
                        backgroundColor: Meteor.UtilFunctions.eventColour(calendarEvent.type)
                    })
                } else if (calendarEvent.type === "training") {
                    var team = Team.findOne(calendarEvent.training.teamId);
                    events.push({
                        id: calendarEvent._id,
                        type: calendarEvent.type,
                        title: 'Training - ' + team.name,
                        allDay: false,
                        start: moment(calendarEvent.startDateTime),
                        end: moment(calendarEvent.endDateTime),
                        backgroundColor: Meteor.UtilFunctions.eventColour(calendarEvent.type)
                    })
                } else {
                    events.push({
                        id: calendarEvent._id,
                        type: calendarEvent.type,
                        title: calendarEvent.title,
                        allDay: false,
                        start: moment(calendarEvent.startDateTime),
                        end: moment(calendarEvent.endDateTime),
                        backgroundColor: Meteor.UtilFunctions.eventColour(calendarEvent.type)
                    })
                }
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

Template.notificationPanel.helpers({
    notifications: function() {
        return Notification.find();
    }
});

Template.notificationPanel.events({
    'click .respond': function() {
        var event = CalendarEvent.findOne(this.eventId);
        Session.set('showEventId', this.eventId);
        Session.set('showEventType', event.type);
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

Template.messagePanel.helpers({
    messageBoards: function() {
        return MessageBoard.find({}, { sort: {createdOn: -1} });
    }
});

Template.messageBoard.helpers({
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
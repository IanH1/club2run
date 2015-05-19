Template.eventList.rendered = function() {
    var eventCalendar = this.$('.eventCalendar');
    this.autorun(function() {
        eventCalendar.fullCalendar('refetchEvents');
    });
};

Template.eventList.helpers({
    headerOptions: function() {
        return {
            left: "title",
            center: "",
            right: "today prev,next agendaWeek,month"
        }
    },
    eventClickHandler: function() {
        return function(calendarEvent) {
            Session.set("showEventId", calendarEvent._id);
            Session.set("showEventType", calendarEvent.type);
            Session.set("showEventModal", true);
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

Template.eventList.events({
    'click .refresh': function(event, template) {
        template.$('.eventCalendar').fullCalendar('refetchEvents');
    }
});
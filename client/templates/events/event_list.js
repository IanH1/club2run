var eventColour = function(eventType) {
    if (eventType === "meeting") {
        return "#FF7373";
    } else if (eventType === "club") {
        return "#B300B3";
    } else if (eventType === "fixture") {
        return "#7CEB98";
    } else if (eventType === "training") {
        return "#FF9C42";
    } else if (eventType === "") {
        return null;
    }
};

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
            Session.set('showEventId', calendarEvent._id);
            Session.set('showEventType', calendarEvent.type);
            Session.set('showEventModal', true);
        };
    },
    dayClickHandler: function() {
        return function(date, allDay, jsEvent, view) {
            Session.set("eventDate", date.toDate());
            Router.go("eventCreate");
        }
    },
    events: function() {
        return function(start, end, tz, callback) {
            var events = [];

            // Fetch a list of calendar events that belong to the club
            CalendarEvent.find().forEach(function(calendarEvent) {
                events.push({
                    id: calendarEvent._id,
                    type: calendarEvent.type,
                    title: calendarEvent.title,
                    allDay: false,
                    start: moment(calendarEvent.startDateTime),
                    end: moment(calendarEvent.endDateTime),
                    backgroundColor: eventColour(calendarEvent.type)
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

Template.eventList.events({
    'click .refresh': function(event, template) {
        template.$('.eventCalendar').fullCalendar('refetchEvents');
    }
});
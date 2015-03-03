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
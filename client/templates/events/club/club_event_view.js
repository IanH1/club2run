Template.clubEventViewModal.helpers({
    event: function() {
        if (Session.get("showEventId")) {
            return CalendarEvent.findOne(Session.get("showEventId"));
        }
    }
});

Template.clubEventViewModal.events({
    'click .edit': function() {
        var id = Session.get("showEventId");
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
        Router.go("eventEdit", {_id: id });
    },
    'click .delete': function() {
        bootbox.confirm("Are you sure you want to delete this club event?", function(result) {
            if (result) {
                var calendarEvent = CalendarEvent.findOne(Session.get("showEventId"));
                Meteor.call('deleteCalendarEvent', calendarEvent, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Club event successfully deleted.");
                        Session.set("showEventId", null);
                        Session.set("showEventType", null);
                        Session.set("showEventModal", false);
                        Router.go("eventList");
                    }
                });
            }
        });
    },
    'click [data-dismiss="modal"]': function() {
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
    }
});
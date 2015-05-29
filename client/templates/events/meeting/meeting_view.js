Template.meetingViewModal.helpers({
    event: function() {
        if (Session.get("showEventId")) {
            return CalendarEvent.findOne(Session.get("showEventId"));
        }
    },
    attendee: function() {
        if (this.userId) {
            return Meteor.users.findOne(this.userId);
        }
    },
    attendeeStatusClass: function() {
        return Meteor.UtilFunctions.cssAvailabilityClass(this.availability);
    },
    currentAttendeeInvite: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event && event.meeting.attendeeIds) {
                return _.find(event.meeting.attendeeIds, function(attendee) {
                    if (attendee.userId === Meteor.userId()) {
                        return attendee;
                    }
                });
            }
        }
    },
    currentAttendeeStatusClass: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event && event.meeting.attendeeIds) {
                var invite = _.find(event.meeting.attendeeIds, function(attendee) {
                    if (attendee.userId === Meteor.userId()) {
                        return attendee;
                    }
                });
                return Meteor.UtilFunctions.cssAvailabilityClass(invite.availability);
            }
        }
    }
});

var updateMeetingInvite = function(availability) {
    var event = CalendarEvent.findOne(Session.get("showEventId"));
    Meteor.call("updateMeetingInvite", event, availability, function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
    });
};

Template.meetingViewModal.events({
    'click .accept': function() {
        updateMeetingInvite("Accepted");
    },
    'click .tenative': function() {
        updateMeetingInvite("Tentative");
    },
    'click .decline': function() {
        updateMeetingInvite("Declined");
    },
    'click .edit': function() {
        var id = Session.get("showEventId");
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
        Router.go("eventEdit", {_id: id });
    },
    'click .delete': function() {
        bootbox.confirm("Are you sure you want to delete this meeting?", function(result) {
            if (result) {
                var calendarEvent = CalendarEvent.findOne(Session.get("showEventId"));
                Meteor.call('deleteCalendarEvent', calendarEvent, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Meeting successfully deleted.");
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
        Session.set('showEventId', null);
        Session.set('showEventType', null);
        Session.set('showEventModal', false);
    }
});
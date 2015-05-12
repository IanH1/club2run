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

var updateMeetingInvite = function(meeting, availability) {
    Meteor.call("updateMeetingInvite", meeting, availability, function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
    });
};

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
        return cssAvailabilityClass(this.availability);
    },
    currentUserInvite: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event && event.meeting && event.meeting.attendeeIds) {
                return _.find(event.meeting.attendeeIds, function(attendee) {
                    if (attendee.userId === Meteor.userId()) {
                        return attendee;
                    }
                });
            }
        }
    },
    currentUserStatusClass: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event && event.meeting && event.meeting.attendeeIds) {
                var invite = _.find(event.meeting.attendeeIds, function(attendee) {
                    if (attendee.userId === Meteor.userId()) {
                        return attendee;
                    }
                });
                return cssAvailabilityClass(invite.availability);
            }
        }
    }
});

Template.meetingViewModal.events({
    'click .accept': function() {
        var meeting = CalendarEvent.findOne(Session.get("showEventId"));
        if (meeting) {
            updateMeetingInvite(meeting, "Accepted");
        }
    },
    'click .tenative': function() {
        var meeting = CalendarEvent.findOne(Session.get("showEventId"));
        if (meeting) {
            updateMeetingInvite(meeting, "Tentative");
        }
    },
    'click .decline': function() {
        var meeting = CalendarEvent.findOne(Session.get("showEventId"));
        if (meeting) {
            updateMeetingInvite(meeting, "Declined");
        }
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
                        FlashMessages.sendSuccess("Training successfully deleted.");
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
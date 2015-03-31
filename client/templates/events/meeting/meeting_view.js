Template.meetingViewModal.helpers({
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

Template.meetingViewModal.events({
    'click .accept': function() {
        var meeting = Meeting.findOne(Session.get("showEventId"));
        if (meeting) {
            updateMeetingInvite(meeting, "Accepted");
        }
    },
    'click .tenative': function() {
        var meeting = Meeting.findOne(Session.get("showEventId"));
        if (meeting) {
            updateMeetingInvite(meeting, "Tentative");
        }
    },
    'click .decline': function() {
        var meeting = Meeting.findOne(Session.get("showEventId"));
        if (meeting) {
            updateMeetingInvite(meeting, "Declined");
        }
    },
    'click [data-dismiss="modal"]': function() {
        Session.set('showEventId', null);
        Session.set('showEventType', null);
        Session.set('showEventModal', false);
    }
});
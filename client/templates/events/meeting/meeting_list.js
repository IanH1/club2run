Template.meetingList.helpers({
    meetings: function() {
        return CalendarEvent.find({ type: "meeting" });
    }
});

Template.meetingList.events({
    'click .delete': function() {
        var meeting = this;
        bootbox.confirm("Are you sure you want to delete this meeting?", function(result) {
            if (result) {
                Meteor.call('deleteCalendarEvent', meeting, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Meeting successfully deleted.");
                        Router.go("eventList");
                    }
                });
            }
        });
    }
});
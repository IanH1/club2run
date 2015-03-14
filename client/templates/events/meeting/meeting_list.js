Template.meetingList.helpers({
    meetings: function() {
        return Meeting.find();
    }
});

Template.meetingList.events({
    'click .delete': function() {
        var meeting = this;
        bootbox.confirm("Are you sure you want to delete this meeting?", function(result) {
            if (result) {
                Meteor.call('deleteMeeting', meeting, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Meeting successfully deleted.");
                        Router.go('eventList');
                    }
                });
            }
        });
    }
});
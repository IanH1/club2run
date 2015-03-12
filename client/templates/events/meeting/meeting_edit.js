Template.meetingEdit.events({
    'click .cancel': function() {
        Router.go('eventList');
    },
    'click .delete': function() {
        var meetingId = this._id;
        bootbox.confirm("Are you sure you want to delete this meeting?", function(result) {
            if (result) {
                Meteor.call('deleteMeeting', meetingId, function(error) {
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

AutoForm.addHooks('editMeeting', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
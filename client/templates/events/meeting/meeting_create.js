Template.meetingCreate.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    createMeeting: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
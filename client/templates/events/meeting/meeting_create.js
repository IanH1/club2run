Template.meetingCreate.events({
    'click .cancel': function() {
        Router.go('eventList');
    }
});

AutoForm.addHooks('createMeeting', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
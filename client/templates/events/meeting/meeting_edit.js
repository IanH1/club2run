Template.meetingEdit.events({
    'click .cancel': function() {
        Router.go('eventList');
    }
});

AutoForm.addHooks('editMeeting', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
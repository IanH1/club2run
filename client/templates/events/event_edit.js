Template.eventEdit.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    editEvent: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
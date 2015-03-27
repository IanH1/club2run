Template.trainingEdit.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    editTraining: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
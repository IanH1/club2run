Template.trainingCreate.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    createTraining: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
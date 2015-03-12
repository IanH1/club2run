Template.trainingCreate.events({
    'click .cancel': function() {
        Router.go('eventList');
    }
});

AutoForm.addHooks('createTraining', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
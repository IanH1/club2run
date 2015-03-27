Template.fixtureCreate.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    createFixture: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
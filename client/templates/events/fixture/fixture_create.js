Template.fixtureCreate.events({
    'click .cancel': function() {
        Router.go('eventList');
    }
});

AutoForm.addHooks('createFixture', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
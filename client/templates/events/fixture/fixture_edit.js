Template.fixtureEdit.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.addHooks("editFixture", {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
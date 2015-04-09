Template.fixtureReport.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    editReport: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
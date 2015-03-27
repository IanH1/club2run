Template.fixtureCreate.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    createFixture: {
        onSubmit: function(insertedFixture) {
            var autoForm = this;
            Meteor.call("insertFixture", insertedFixture, Meteor.user().profile.currentClubId, function(error) {
                if (error) {
                    autoForm.done(error);
                } else {
                    autoForm.done();
                }
            });
            return false;
        },
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
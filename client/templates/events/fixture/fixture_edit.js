Template.fixtureEdit.events({
    'click .cancel': function() {
        Router.go('eventList');
    },
    'click .delete': function() {
        var fixtureId = this._id;
        bootbox.confirm("Are you sure you want to delete this fixture?", function(result) {
            if (result) {
                Meteor.call('deleteFixture', fixtureId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Fixture successfully deleted.");
                        Router.go('eventList');
                    }
                });
            }
        });
    }
});

AutoForm.addHooks('editFixture', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
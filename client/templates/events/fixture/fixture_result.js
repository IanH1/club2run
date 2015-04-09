Template.fixtureResult.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    editResult: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            var thiz = this;
            Meteor.call('updateFixtureResult', currentDoc, updateDoc, currentDoc._id, function(error) {
                if (error) {
                    thiz.done(error);
                } else {
                    thiz.done();
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
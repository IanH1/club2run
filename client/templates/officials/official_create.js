Template.officialCreate.events({
    'click .cancel': function() {
        Router.go("officialList");
    }
});

AutoForm.hooks({
    createOfficial: {
        onSubmit: function(insertedOfficial) {
            var autoForm = this;
            Meteor.call("insertOfficial", insertedOfficial, Session.get("currentClub")._id, function(error) {
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
            Router.go("officialList");
        }
    }
});
Template.staffCreate.events({
    'click .cancel': function() {
        Router.go("staffList");
    }
});

AutoForm.hooks({
    createStaff: {
        onSubmit: function(insertedStaff) {
            var autoForm = this;
            Meteor.call("insertStaff", insertedStaff, Session.get("currentClub")._id, function(error) {
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
            Router.go("staffList");
        }
    }
});
Template.userCreate.events({
    'click .cancel': function() {
        Router.go("userList");
    }
});

AutoForm.hooks({
    createUser: {
        onSubmit: function(insertedUser) {
            var autoForm = this;
            Meteor.call("insertUser", insertedUser, Session.get("currentClub")._id, function(error) {
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
            Router.go("userList");
        }
    }
});
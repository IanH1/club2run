Template.profile.events({
    'click .cancel': function() {
        Router.go("home");
    }
});

AutoForm.hooks({
    updateUser: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("home");
        }
    }
});
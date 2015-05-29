Template.clubEdit.events({
    'click .cancel': function() {
        Router.go("home");
    }
});

AutoForm.hooks({
    editClub: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("home");
        }
    }
});
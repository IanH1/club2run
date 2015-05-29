Template.officialCreate.events({
    'click .cancel': function() {
        Router.go("officialList");
    }
});

AutoForm.hooks({
    createOfficial: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("officialList");
        }
    }
});
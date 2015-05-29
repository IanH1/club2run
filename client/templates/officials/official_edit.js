Template.officialEdit.events({
    'click .cancel': function() {
        Router.go("officialList");
    }
});

AutoForm.hooks({
    editOfficial: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("officialList");
        }
    }
});
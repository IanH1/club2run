Template.userEdit.events({
    'click .cancel': function() {
        Router.go("userList");
    }
});

AutoForm.hooks({
    userEdit: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("userList");
        }
    }
});
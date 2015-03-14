Template.userEdit.events({
    'click .cancel': function() {
        Router.go('userList');
    }
});

AutoForm.addHooks('editUser', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('userList');
    }
});
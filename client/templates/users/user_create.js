Template.userCreate.events({
    'click .cancel': function() {
        Router.go('userList');
    }
});

AutoForm.addHooks('createUser', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('userList');
    }
});
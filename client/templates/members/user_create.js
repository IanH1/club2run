Template.userCreate.events({
    'click .cancel': function() {
        Router.go('userList');
    }
});

AutoForm.addHooks('createUser', {
    onSuccess: function() {
        Router.go('userList');
    }
});
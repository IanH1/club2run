Template.profile.events({
    'click .cancel': function() {
        Router.go('home');
    }
});

AutoForm.addHooks('updateProfile', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('home');
    }
});
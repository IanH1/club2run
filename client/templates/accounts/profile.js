Template.profile.events({
    'click .cancel': function() {
        Router.go('home');
    }
});

AutoForm.addHooks('updateProfile', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Profile successfully updated.");
        Router.go('home');
    }
});
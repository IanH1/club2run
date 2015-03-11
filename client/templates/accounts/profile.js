Template.profile.events({
    'click .cancel': function() {
        Router.go('home');
    }
});

AutoForm.addHooks('updateProfile', {
    onSuccess: function() {
        Router.go('home');
    }
});
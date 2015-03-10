Template.clubEdit.events({
    'click .cancel': function() {
        Router.go('home');
    }
});

AutoForm.addHooks('editClub', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Club successfully updated.");
        Router.go('home');
    }
});
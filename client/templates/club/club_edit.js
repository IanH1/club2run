Template.clubEdit.events({
    'click .cancel': function() {
        Router.go('club');
    }
});

AutoForm.addHooks('editClub', {
    onSuccess: function() {
        Router.go('club');
    }
});
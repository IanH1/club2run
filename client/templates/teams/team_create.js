Template.teamCreate.events({
    'click .cancel': function() {
        Router.go('teamList');
    }
});

AutoForm.addHooks('createTeam', {
    onSuccess: function() {
        Router.go('teamList');
    }
});
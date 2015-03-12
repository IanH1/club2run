Template.teamCreate.events({
    'click .cancel': function() {
        Router.go('teamList');
    }
});

AutoForm.addHooks('createTeam', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('teamList');
    }
});
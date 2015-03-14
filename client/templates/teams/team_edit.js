Template.teamEdit.events({
    'click .cancel': function() {
        Router.go('teamList');
    }
});

AutoForm.addHooks('editTeam', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('teamList');
    }
});
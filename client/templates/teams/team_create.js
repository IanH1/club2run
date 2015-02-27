Template.teamCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('teamList');
    }
});

AutoForm.addHooks('createTeam', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Team successfully created.");
        Router.go('teamList');
    }
});
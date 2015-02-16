Template.teamEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('teamList');
    }
});

AutoForm.addHooks('editTeam', {
    onSuccess: function() {
        Router.go('teamList');
    }
});
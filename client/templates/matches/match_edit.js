Template.matchEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('matchList');
    }
});

AutoForm.addHooks('editMatch', {
    onSuccess: function() {
        Router.go('matchList');
    }
});
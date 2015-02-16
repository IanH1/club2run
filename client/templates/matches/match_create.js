Template.matchCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('matchList');
    }
});

AutoForm.addHooks('createMatch', {
    onSuccess: function() {
        Router.go('matchList');
    }
});
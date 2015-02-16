Template.officalCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('officalList');
    }
});

AutoForm.addHooks('createOffical', {
    onSuccess: function() {
        Router.go('officalList');
    }
});
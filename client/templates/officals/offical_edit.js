Template.officalEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('officalList');
    }
});

AutoForm.addHooks('editOffical', {
    onSuccess: function() {
        Router.go('officalList');
    }
});
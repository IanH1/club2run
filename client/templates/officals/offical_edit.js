Template.officialEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('officialList');
    }
});

AutoForm.addHooks('editOfficial', {
    onSuccess: function() {
        Router.go('officialList');
    }
});
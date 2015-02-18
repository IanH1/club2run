Template.officialCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('officialList');
    }
});

AutoForm.addHooks('createOfficial', {
    onSuccess: function() {
        Router.go('officialList');
    }
});
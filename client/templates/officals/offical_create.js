Template.officialCreate.events({
    'click .cancel': function() {
        Router.go('officialList');
    }
});

AutoForm.addHooks('createOfficial', {
    onSuccess: function() {
        Router.go('officialList');
    }
});
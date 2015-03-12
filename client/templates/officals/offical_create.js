Template.officialCreate.events({
    'click .cancel': function() {
        Router.go('officialList');
    }
});

AutoForm.addHooks('createOfficial', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('officialList');
    }
});
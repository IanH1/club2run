Template.officialCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('officialList');
    }
});

AutoForm.addHooks('createOfficial', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Official successfully created.");
        Router.go('officialList');
    }
});
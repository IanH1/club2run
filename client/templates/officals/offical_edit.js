Template.officialEdit.events({
    'click .cancel': function() {
        Router.go('officialList');
    }
});

AutoForm.addHooks('editOfficial', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('officialList');
    }
});
Template.staffCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('staffList');
    }
});

AutoForm.addHooks('createStaff', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Staff successfully created.");
        Router.go('staffList');
    }
});
Template.staffCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('staffList');
    }
});

AutoForm.addHooks('createStaff', {
    onSuccess: function() {
        Router.go('staffList');
    }
});
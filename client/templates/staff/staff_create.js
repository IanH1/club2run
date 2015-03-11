Template.staffCreate.events({
    'click .cancel': function() {
        Router.go('staffList');
    }
});

AutoForm.addHooks('createStaff', {
    onSuccess: function() {
        Router.go('staffList');
    }
});
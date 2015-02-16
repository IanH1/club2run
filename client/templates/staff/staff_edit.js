Template.staffEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('staffList');
    }
});

AutoForm.addHooks('editStaff', {
    onSuccess: function() {
        Router.go('staffList');
    }
});
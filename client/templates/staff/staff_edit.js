Template.staffEdit.events({
    'click .cancel': function() {
        Router.go("staffList");
    }
});

AutoForm.hooks({
    editStaff: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("staffList");
        }
    }
});
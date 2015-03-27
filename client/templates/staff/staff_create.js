Template.staffCreate.events({
    'click .cancel': function() {
        Router.go("staffList");
    }
});

AutoForm.hooks({
    createStaff: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("staffList");
        }
    }
});
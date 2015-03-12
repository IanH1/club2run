Template.staffEdit.events({
    'click .cancel': function() {
        Router.go('staffList');
    },
    'click .delete': function() {
        var staffId = this._id;
        bootbox.confirm("Are you sure you want to delete this member of staff?", function(result) {
            if (result) {
                Meteor.call('deleteStaff', staffId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Staff successfully deleted.");
                        Router.go('staffList');
                    }
                });
            }
        });
    }
});

AutoForm.addHooks('editStaff', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('staffList');
    }
});
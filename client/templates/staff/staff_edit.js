Template.staffEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('staffList');
    },
    'click .delete': function(event, template) {
        var staffId = this._id;
        bootbox.confirm("Are you sure you want to delete " + this.fullName + "?", function(result) {
            if (result) {
                Meteor.call('deleteStaff', staffId, function(error, result) {
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
        FlashMessages.sendSuccess("Staff successfully updated.");
        Router.go('staffList');
    }
});
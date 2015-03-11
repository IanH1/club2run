Template.userEdit.events({
    'click .cancel': function() {
        Router.go('userList');
    },
    'click .delete': function() {
        var userId = this._id;
        bootbox.confirm("Are you sure you want to delete this user?", function(result) {
            if (result) {
                Meteor.call('deleteUser', userId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("User successfully deleted.");
                        Router.go('userList');
                    }
                });
            }
        });
    }
});

AutoForm.addHooks('editUser', {
    onSuccess: function() {
        Router.go('userList');
    }
});
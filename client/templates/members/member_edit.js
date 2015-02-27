Template.memberEdit.events({
    'click .delete': function() {
        var memberId = this._id;
        bootbox.confirm("Are you sure you want to delete " + this.fullName + "?", function(result) {
            if (result) {
                Meteor.call('deleteMember', memberId, function(error, result) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Member successfully deleted.");
                        Router.go('memberList');
                    }
                });
            }
        });
    },
    'click .create-user': function() {
        var memberId = this._id;
        bootbox.confirm("Are you sure you want to create a user for this member " + this.fullName + "?", function(result) {
            if (result) {
                Meteor.call('createNewUserFromMember', memberId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("User successfully created.");
                        Router.go('memberList');
                    }
                });
            }
        });
    },
    'click .cancel': function(e, tpl) {
        Router.go('memberList');
    }
});

AutoForm.addHooks('editMember', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Member successfully updated.");
        Router.go('memberList');
    }
});
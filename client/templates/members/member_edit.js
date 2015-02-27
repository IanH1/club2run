Template.memberEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('memberList');
    },
    'click .delete': function(event, template) {
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
    }
});

AutoForm.addHooks('editMember', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Member successfully updated.");
        Router.go('memberList');
    }
});
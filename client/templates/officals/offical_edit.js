Template.officialEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('officialList');
    },
    'click .delete': function(event, template) {
        var officialId = this._id;
        bootbox.confirm("Are you sure you want to delete " + this.fullName + "?", function(result) {
            if (result) {
                Meteor.call('deleteOfficial', officialId, function(error, result) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Staff successfully deleted.");
                        Router.go('officialList');
                    }
                });
            }
        });
    }
});

AutoForm.addHooks('editOfficial', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Official successfully updated.");
        Router.go('officialList');
    }
});
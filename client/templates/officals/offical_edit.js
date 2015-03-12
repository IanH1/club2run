Template.officialEdit.events({
    'click .cancel': function() {
        Router.go('officialList');
    },
    'click .delete': function(event, template) {
        var officialId = this._id;
        bootbox.confirm("Are you sure you want to delete this official?", function(result) {
            if (result) {
                Meteor.call('deleteOfficial', officialId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Official successfully deleted.");
                        Router.go('officialList');
                    }
                });
            }
        });
    }
});

AutoForm.addHooks('editOfficial', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('officialList');
    }
});
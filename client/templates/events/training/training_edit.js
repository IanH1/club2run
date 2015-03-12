Template.trainingEdit.events({
    'click .cancel': function() {
        Router.go('eventList');
    },
    'click .delete': function() {
        var trainingId = this._id;
        bootbox.confirm("Are you sure you want to delete this training?", function(result) {
            if (result) {
                Meteor.call('deleteTraining', trainingId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Training successfully deleted.");
                        Router.go('eventList');
                    }
                });
            }
        });
    }
});

AutoForm.addHooks('editTraining', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
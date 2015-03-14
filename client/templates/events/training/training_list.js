Template.trainingList.helpers({
    training: function() {
        return Training.find();
    },
    team: function() {
        if (this.teamId) {
            return Team.findOne(this.teamId);
        }
    }
});

Template.trainingList.events({
    'click .delete': function() {
        var training = this;
        bootbox.confirm("Are you sure you want to delete this training?", function(result) {
            if (result) {
                Meteor.call('deleteTraining', training, function(error) {
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
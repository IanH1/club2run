Template.trainingList.helpers({
    training: function() {
        return CalendarEvent.find({ type: "training" });
    },
    team: function() {
        if (this.training.teamId) {
            return Team.findOne(this.training.teamId);
        }
    }
});

Template.trainingList.events({
    'click .delete': function() {
        var meeting = this;
        bootbox.confirm("Are you sure you want to delete this training?", function(result) {
            if (result) {
                Meteor.call('deleteCalendarEvent', meeting, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Training successfully deleted.");
                        Router.go("eventList");
                    }
                });
            }
        });
    }
});
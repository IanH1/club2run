Template.fixtureList.helpers({
    fixtures: function() {
        return CalendarEvent.find({ type: "fixture" });
    },
    team: function() {
        if (this.fixture.teamId) {
            return Team.findOne(this.fixture.teamId);
        }
    }
});

Template.fixtureList.events({
    'click .delete': function() {
        var meeting = this;
        bootbox.confirm("Are you sure you want to delete this fixture?", function(result) {
            if (result) {
                Meteor.call('deleteCalendarEvent', meeting, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Fixture successfully deleted.");
                        Router.go("eventList");
                    }
                });
            }
        });
    }
});
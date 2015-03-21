Template.fixtureList.helpers({
    fixtures: function() {
        return Fixture.find();
    },
    team: function() {
        if (this.teamId) {
            return Team.findOne(this.teamId);
        }
    }
});

Template.fixtureList.events({
    'click .delete': function() {
        var fixture = this;
        bootbox.confirm("Are you sure you want to delete this fixture?", function(result) {
            if (result) {
                Meteor.call("deleteFixture", fixture, function(error) {
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
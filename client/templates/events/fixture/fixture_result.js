Template.fixtureResult.helpers({
    homeLabel: function() {
        var homeTeam = Team.findOne(this.fixture.homeTeamId);
        return homeTeam.name + " Score"
    },
    awayLabel: function() {
        var awayTeam = Team.findOne(this.fixture.awayTeamId);
        return awayTeam.name + " Score"
    }
});

Template.fixtureResult.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.hooks({
    editFixtureResult: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            var thiz = this;
            Meteor.call('updateFixtureResult', currentDoc, updateDoc, currentDoc._id, function(error) {
                if (error) {
                    thiz.done(error);
                } else {
                    thiz.done();
                }
            });
            return false;
        },
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
Template.fixtureTeamSelection.helpers({
    fixture: function() {
        if (this.fixtureId) {
            return Fixture.findOne(this.fixtureId);
        }
    },
    team: function() {
        if (this.teamId) {
            return Team.findOne(this.teamId);
        }
    },
    playerOptions: function() {
        var options = [];
        if (this.teamId) {
            Team.findOne(this.teamId).squad.forEach(function(playerId) {
                var user = Meteor.users.findOne(playerId);
                options.push({
                    label: user.profile.fullName, value: playerId
                })
            });
        }
        return options;
    }
});

Template.fixtureTeamSelection.events({
    'click .cancel': function() {
        Router.go('eventList');
    }
});

AutoForm.addHooks('teamSelection', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('eventList');
    }
});
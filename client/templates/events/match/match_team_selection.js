Template.matchTeamSelection.helpers({
    match: function() {
        if (this.matchId) {
            return Events.findOne(this.matchId);
        }
    },
    team: function() {
        if (this.matchId) {
            var teamId = Events.findOne(this.matchId).match.teamId;
            if (teamId) {
                return Teams.findOne(teamId);
            }
        }
    },
    playerOptions: function() {
        var options = [];
        if (this.matchId) {
            var teamId = Events.findOne(this.matchId).match.teamId;
            if (teamId) {
                Teams.findOne(teamId).players.forEach(function (playerId) {
                    var player = Members.findOne(playerId);
                    options.push({
                        label: player.fullName, value: player._id
                    })
                });
            }
        }
        return options;
    }
});

Template.matchTeamSelection.events({
    'click .cancel': function() {
        Router.go('eventList');
    }
});

AutoForm.addHooks('teamSelection', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Team selection successfully updated.");
        Router.go('eventList');
    }
});
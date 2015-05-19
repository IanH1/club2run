Template.fixtureEdit.helpers({
    playerOptions: function() {
        var options = [];
        if (this.fixture.homeTeamId) {
            Team.findOne(this.fixture.homeTeamId).players.forEach(function(player) {
                var user = Meteor.users.findOne(player.userId);
                options.push({
                    label: user.profile.fullName, value: user._id
                })
            });
        }
        return options;
    }
});
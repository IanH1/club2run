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
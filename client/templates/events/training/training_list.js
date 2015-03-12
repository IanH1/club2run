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
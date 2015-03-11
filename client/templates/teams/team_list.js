Template.teamList.helpers({
    teams: function() {
        return Team.find();
    },
    manager: function() {
        return Staff.findOne(this.managerId);
    },
    coaches: function() {
        if (this.coachIds) {
            return Staff.find({ _id: {$in: this.coachIds }});
        }
    }
});
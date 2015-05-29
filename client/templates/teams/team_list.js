Template.teamList.helpers({
    teams: function() {
        return Team.find();
    },
    manager: function() {
        if (this.managerId) {
            return Staff.findOne(this.managerId);
        }
    },
    coaches: function() {
        if (this.coachIds) {
            return Staff.find({ _id: { $in: this.coachIds }});
        }
    }
});

Template.teamList.events({
    'click .delete': function() {
        var team = this;
        bootbox.confirm("Are you sure you want to delete this team?", function(result) {
            if (result) {
                Meteor.call("deleteTeam", team, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Team successfully deleted.");
                        Router.go("teamList");
                    }
                });
            }
        });
    }
});
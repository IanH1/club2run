Template.fixtureSquadSelection.helpers({
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
            Team.findOne(this.teamId).squad.forEach(function(squadMember) {
                var user = Meteor.users.findOne(squadMember.userId);
                options.push({
                    label: user.profile.fullName, value: user._id
                })
            });
        }
        return options;
    }
});

Template.fixtureSquadSelection.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

AutoForm.addHooks('squadSelection', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go("eventList");
    }
});
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
    'click .publish': function() {
        var id = this._id;
        bootbox.confirm("Are you sure you want to publish this team sheet, this will send a notification to each player?", function(result) {
            if (result) {
                Meteor.call("publishSquadSelection", id, Session.get("currentClub")._id, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Squad selection successfully published.");
                        Router.go("eventList");
                    }
                });
            }
        });
    },
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
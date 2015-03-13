// Create the collection
TeamSelection = new Mongo.Collection('team_selection');

Meteor.methods({
    createTeamSelectionForFixture: function(fixtureId, fixture) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        var club = Club.findOne();
        var team = Team.findOne(fixture.teamId);

        if (club && team) {

            // Build the squad
            var numberOfPlayers = club.type.numberOfPlayers + club.type.numberOfSubstitutes;
            var squad = [];
            for (var i = 0; i < numberOfPlayers; i++) {
                squad.push({
                    squadNumber: i + 1,
                    userId: team.squad[i]
                });
            }

            // Create the new team selection
            var teamSelection = {
                fixtureId: fixtureId,
                teamId: fixture.teamId,
                published: false,
                squad: squad
            };

            // Check if the event is valid
            check(teamSelection, Schema.TeamSelection);

            // Insert the new team selection
            TeamSelection.insert(teamSelection);
        }
    },
    updateTeamSelection: function(teamSelection, modifier, teamSelectionId) {

        //Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        teamSelection = _.extend(teamSelection,
            //{description: eventDescription(event)},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the event is valid
        check(teamSelection, Schema.TeamSelection);

        // Update the existing event
        TeamSelection.update(teamSelectionId, {$set: teamSelection});
    },
    updateTeamSelectionInvite: function(teamSelectionId, availability) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Update the team selection
        TeamSelection.update({ _id : teamSelectionId, 'squad.userId': Meteor.userId() }, { $set: {'squad.$.availability': availability }});
    },
    deleteTeamSelectionForFixture: function(fixtureId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the fixture
        TeamSelection.remove({ fixtureId: fixtureId });
    }
});
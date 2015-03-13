// Create the collection
TeamSelection = new Mongo.Collection('team_selection');

Meteor.methods({
    createTeamSelectionForFixture: function(fixtureId, fixture) {
        var club = Club.findOne(fixture.clubId);
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
                email: false,
                sms: false,
                squad: squad
            }

            // Check if the event is valid
            check(teamSelection, Schema.TeamSelection);

            // Insert the new team selection
            TeamSelection.insert(teamSelection);
        }
    }
//    updateTeamSelection: function(teamSelection, modifier, teamSelectionId) {
//
//        //Check user permissions
//        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
//            throw new Meteor.Error(403, "Access denied")
//        }
//
//        // Apply default values
//        teamSelection = _.extend(teamSelection,
//            //{description: eventDescription(event)},
//            {modifiedOn: new Date()},
//            {modifiedBy: Meteor.userId()}
//        );
//
//        // Check if the event is valid
//        check(teamSelection, Schema.TeamSelection);
//
//        // Update the existing event
//        TeamSelections.update(teamSelectionId, {$set: teamSelection});
//    }
});
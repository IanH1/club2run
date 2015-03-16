// Create the collection
TeamSelection = new Mongo.Collection("team_selection");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Create and insert a new team selection.
         */
        createAndInsertTeamSelection: function(fixtureId, teamId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            var club = Club.findOne();
            var team = Team.findOne(teamId);
            if (club && team) {

                // Build the squad
                var squad = [];
                for (var i = 0; i < club.type.numberOfPlayers; i++) {
                    squad.push({
                        squadNumber: i + 1,
                        userId: team.squad[i]
                    });
                }

                // Create the new team selection
                var teamSelection = { fixtureId: fixtureId, teamId: teamId, published: false, squad: squad };

                // Check if the event is valid
                check(teamSelection, Schema.TeamSelection);

                // Insert the new team selection
                var teamSelectionId = TeamSelection.insert(teamSelection);

                return { _id: teamSelectionId };
            }
        },

        /*
         * Update a team selection.
         */
        updateTeamSelection: function(teamSelection, modifier, teamSelectionId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            teamSelection = _.extend(teamSelection,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the event is valid
            check(teamSelection, Schema.TeamSelection);

            // Update the team selection
            TeamSelection.update(teamSelectionId, { $set: teamSelection });
        },

        /*
         * Delete a team selection using the fixture id.
         */
        deleteTeamSelectionByFixtureId: function(fixtureId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the team selection
            TeamSelection.remove({ fixtureId: fixtureId });
        },

        /*
         * Update a team selection invite for the current user.
         */
        updateTeamSelectionInvite: function(teamSelectionId, availability) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the team selection
            TeamSelection.update({ _id: teamSelectionId, 'squad.userId': Meteor.userId() }, { $set: { 'squad.$.availability': availability }});
        }
    });
}
// Create the collection
SquadSelection = new Mongo.Collection("squad_selection");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Create and insert a new squad selection.
         *
         * @param   fixtureId - the fixture id to assign
         * @param   teamId - the team id to assign
         * @param   clubId - the current club
         *
         * @return  The id of the inserted squad selection
         */
        createAndInsertSquadSelection: function(fixtureId, teamId, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            var club = Club.findOne(clubId);
            var team = Team.findOne(teamId);

            // Copy the squad from the default squad selected on the team
            var squad = [];
            for (var i = 0; i < club.type.numberOfPlayers; i++) {
                var teamSquad = team.squad[i];
                if (teamSquad) {
                    squad.push({
                        squadNumber: teamSquad.squadNumber,
                        userId: teamSquad.userId,
                        position: teamSquad.position
                    });
                } else {
                    squad.push({
                        squadNumber: i + 1
                    });
                }
            }

            // Create the new squad selection
            var squadSelection = {
                fixtureId: fixtureId,
                teamId: teamId,
                clubId: clubId,
                published: false,
                squad: squad
            };

            // Check if the squad selection is valid
            check(squadSelection, Schema.SquadSelection);

            // Insert the new squad selection
            var squadSelectionId = SquadSelection.insert(squadSelection);

            return { _id: squadSelectionId };
        },

        /*
         * Update a squad selection.
         */
        updateSquadSelection: function(squadSelection, modifier, squadSelectionId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            squadSelection = _.extend(squadSelection,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the squad selection is valid
            check(squadSelection, Schema.SquadSelection);

            // Update the squad selection
            SquadSelection.update(squadSelectionId, { $set: squadSelection });
        },

        /*
         * Delete a squad selection.
         *
         * @param   squadSelection - the squad selection to delete
         */
        deleteSquadSelection: function(squadSelection) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], squadSelection.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the squad selection
            SquadSelection.remove(squadSelection._id);
        },

        /*
         * Update a squad selection invite for the current user.
         */
        updateSquadSelectionInvite: function(squadSelectionId, availability) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the squad selection
            SquadSelection.update({ _id: squadSelectionId, 'squad.userId': Meteor.userId() }, { $set: { 'squad.$.availability': availability }});
        }
    });
}
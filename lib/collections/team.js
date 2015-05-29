// Create the collection
Team = new Mongo.Collection("team");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new team.
         *
         * @param   team - the team to insert
         *
         * @return  The id of the inserted team
         */
        insertTeam: function(team, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            team = _.extend(team,
                {clubId: Meteor.user().profile.currentClubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the team is valid
            check(team, Schema.Team);

            // Insert the new team
            var teamId = Team.insert(team);

            // Remove existing player roles
            Roles.getUsersInRole("player", teamId).forEach(function(user) {
                Roles.removeUsersFromRoles(user._id, ["player"], teamId);
            });

            // Assign the player role to each player
            if (team.players) {
                for (var i = 0; i < team.players.length; i++) {
                    if (team.players[i].userId) {
                        Roles.addUsersToRoles(team.players[i].userId, ["player"], teamId);
                    }
                }
            }

            return { _id: teamId };
        },

        /*
         * Update a team.
         *
         * @param   team - the team to update
         * @param   modifier - modifier generated from the form values
         * @param   teamId - the team id
         */
        updateTeam: function(team, modifier, teamId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "manager"], team.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            team = _.extend(team,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the team is valid
            check(team, Schema.Team);

            // Update the team
            Team.update(teamId, { $set: team });

            // Remove existing player roles
            Roles.getUsersInRole("player", teamId).forEach(function(user) {
                Roles.removeUsersFromRoles(user._id, ["player"], teamId);
            });

            // Assign the player role to each player
            if (team.players) {
                for (var i = 0; i < team.players.length; i++) {
                    if (team.players[i].userId) {
                        Roles.addUsersToRoles(team.players[i].userId, ["player"], teamId);
                    }
                }
            }
        },

        /*
         * Delete a team.
         *
         * @param   team - the team to delete
         */
        deleteTeam: function(team) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], team.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Remove existing player roles
            Roles.getUsersInRole("player", team._id).forEach(function(user) {
                Roles.removeUsersFromRoles(user._id, ["player"], team._id);
            });

            // Delete the team
            Team.remove(team._id);
        }
    });
}
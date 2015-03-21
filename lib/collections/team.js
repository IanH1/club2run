// Create the collection
Team = new Mongo.Collection("team");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new team.
         *
         * @param   team - the team to insert
         * @param   clubId - the current club
         *
         * @return  The id of the inserted team
         */
        insertTeam: function(team, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            team = _.extend(team,
                {clubId: clubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the team is valid
            check(team, Schema.Team);

            // Insert the new team
            var teamId = Team.insert(team);

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
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], team.clubId)) {
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

            // Delete the team
            Team.remove(team._id);
        }
    });
}
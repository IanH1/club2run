// Create the collection
Team = new Mongo.Collection('team');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new team.
         */
        insertTeam: function(team) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            team = _.extend(team,
                {clubId: Club.find()},
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
         */
        updateTeam: function(team, modifier, teamId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Club.find())) {
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
         */
        deleteTeam: function(teamId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the team
            Team.remove(teamId);
        }
    });
}
Team = new Mongo.Collection('team');

Meteor.methods({
    insertTeam: function(team) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
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

        // Add notification
        //Meteor.call("insertNotification", {description: "Team created by " + Meteor.user().profile.fullName, link: 'teamEdit', linkId: teamId});

        return {
            _id: teamId
        };
    },
    updateTeam: function(team, modifier, teamId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        team = _.extend(team,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the team is valid
        check(team, Schema.Team);

        // Update the existing team
        Team.update(teamId, {$set: team});

        // Add notification
        //Meteor.call("insertNotification", {description: "Team updated by " + Meteor.user().profile.fullName, link: 'teamEdit', linkId: teamId});
    },
    deleteTeam: function(teamId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing team
        Team.remove(teamId);

        // Add notification
        //Meteor.call("insertNotification", {description: "Team deleted by " + Meteor.user().profile.fullName});
    }
});
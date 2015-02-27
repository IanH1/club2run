Teams = new Mongo.Collection('teams');

Meteor.methods({
    insertTeam: function(team) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        team = _.extend(team,
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the team is valid
        check(team, Schema.TeamSchema);

        // Insert the new team
        var teamId = Teams.insert(team);

        // Add notification
        Meteor.call("insertNotification", {description: "Team created by " + Meteor.user().profile.fullName});

        return {
            _id: teamId
        };
    },
    updateTeam: function(team, modifier, teamId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        team = _.extend(team,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the team is valid
        check(team, Schema.TeamSchema);

        // Update the existing team
        Teams.update(teamId, {$set: team});

        // Add notification
        Meteor.call("insertNotification", {description: "Team updated by " + Meteor.user().profile.fullName});
    },
    deleteTeam: function(teamId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing team
        Teams.remove(teamId);

        // Add notification
        Meteor.call("insertNotification", {description: "Team deleted by " + Meteor.user().profile.fullName});
    }
});

// Client side permissions
Teams.allow({
    insert: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin', 'club_admin'], Roles.GLOBAL_GROUP);
    },
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin', 'club_admin'], Roles.GLOBAL_GROUP);
    },
    remove: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin', 'club_admin'], Roles.GLOBAL_GROUP);
    }
});
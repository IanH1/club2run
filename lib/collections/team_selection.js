// Create the collection
TeamSelections = new Mongo.Collection('team_selection');

Meteor.methods({

    insertTeamSelection: function(teamSelection) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        teamSelection = _.extend(teamSelection,
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the team is valid
        check(teamSelection, Schema.TeamSelection);

        // Insert the new team selection
        var teamSelectionId = TeamSelections.insert(teamSelection);
    },
    updateTeamSelection: function(teamSelection, modifier, teamSelectionId) {

        //Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
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
        TeamSelections.update(teamSelectionId, {$set: teamSelection});
    }
});
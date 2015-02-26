Teams = new Mongo.Collection('teams');

Meteor.methods({
    teamInsert: function(teamAttributes) {

        var team = _.extend(teamAttributes, {
            clubId: Meteor.user().profile.clubId,
            createdOn: new Date(),
            createdBy: Meteor.userId(),
            modifiedOn: new Date(),
            modifiedBy: Meteor.userId()
        });

        check(team, Schema.TeamSchema);

        return {
            _id: Teams.insert(team)
        };
    }
});

// Collection hooks
Meteor.isClient && Teams.after.insert(function (userId, team) {

    // Add a new notification
    Notifications.insert({
        description: "Team '" + team.name + "' created by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Team '" + team.name + "' successfully created.");
});
Meteor.isClient && Teams.after.update(function (userId, team) {

    // Add a new notification
    Notifications.insert({
        description: "Team '" + team.name + "' updated by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Team '" + team.name + "' successfully updated.");
});
Meteor.isClient && Teams.after.remove(function (userId, team) {

    // Add a new notification
    Notifications.insert({
        description: "Team '" + team.name + "' deleted by '" + Meteor.user().profile.fullName + "'.",
        read: false,
        userId: userId
    });

    // Display confirmation message
    FlashMessages.sendSuccess("Team '" + team.name + "' successfully deleted.");
});

// Client side permissions
Teams.allow({
    insert: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    remove: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    }
});
Officials = new Mongo.Collection('officials');

Meteor.methods({
    insertOfficial: function(official) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        var fullName = official.firstName + " " + official.lastName;
        official = _.extend(official,
            {fullName: fullName},
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the official is valid
        check(official, Schema.OfficialSchema);

        // Insert the new official
        var officialId = Officials.insert(official);

        // Add notification
        Meteor.call("insertNotification", {description: "Official created by " + Meteor.user().profile.fullName});

        return {
            _id: officialId
        };
    },
    updateOfficial: function(official, modifier, officialId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        var fullName = official.firstName + " " + official.lastName;
        official = _.extend(official,
            {fullName: fullName},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the official is valid
        check(official, Schema.OfficialSchema);

        // Update the existing official
        Officials.update(officialId, {$set: official});

        // Add notification
        Meteor.call("insertNotification", {description: "Official updated by " + Meteor.user().profile.fullName});
    },
    deleteOfficial: function(officialId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing official
        Officials.remove(officialId);

        // Add notification
        Meteor.call("insertNotification", {description: "Official deleted by " + Meteor.user().profile.fullName});
    }
});

// Client side permissions
Officials.allow({
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
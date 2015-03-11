Official = new Mongo.Collection('official');

Meteor.methods({
    insertOfficial: function(official) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
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
        check(official, Schema.Official);

        // Insert the new official
        var officialId = Official.insert(official);

        // Add notification
        //Meteor.call("insertNotification", {description: "Official created by " + Meteor.user().profile.fullName, link: 'officialEdit', linkId: officialId});

        return {
            _id: officialId
        };
    },
    updateOfficial: function(official, modifier, officialId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
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
        check(official, Schema.Official);

        // Update the existing official
        Official.update(officialId, {$set: official});

        // Add notification
        //Meteor.call("insertNotification", {description: "Official updated by " + Meteor.user().profile.fullName, link: 'officialEdit', linkId: officialId});
    },
    deleteOfficial: function(officialId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing official
        Official.remove(officialId);

        // Add notification
        //Meteor.call("insertNotification", {description: "Official deleted by " + Meteor.user().profile.fullName});
    }
});
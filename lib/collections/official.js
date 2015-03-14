// Create the collection
Official = new Mongo.Collection('official');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new official.
         */
        insertOfficial: function(official) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            official = _.extend(official,
                {fullName: official.firstName + " " + official.lastName},
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

            return { _id: officialId };
        },

        /*
         * Update an official.
         */
        updateOfficial: function(official, modifier, officialId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            official = _.extend(official,
                {fullName: official.firstName + " " + official.lastName},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the official is valid
            check(official, Schema.Official);

            // Update the official
            Official.update(officialId, { $set: official });
        },

        /*
         * Delete an official.
         */
        deleteOfficial: function(official) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the official
            Official.remove(official._id);
        }
    });
}
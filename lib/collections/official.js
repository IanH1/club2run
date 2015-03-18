// Create the collection
Official = new Mongo.Collection("official");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new official.
         *
         * @param   official - the official to insert
         * @param   clubId - the current club
         *
         * @return  The id of the inserted official
         */
        insertOfficial: function(official, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            official = _.extend(official,
                {fullName: official.firstName + " " + official.lastName},
                {clubId: clubId},
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
         *
         * @param   official - the official to update
         * @param   modifier - modifier generated from the form values
         * @param   officialId - the official id
         */
        updateOfficial: function(official, modifier, officialId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], official.clubId)) {
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
         *
         * @param   official - the official to delete
         */
        deleteOfficial: function(official) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], official.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the official
            Official.remove(official._id);
        }
    });
}
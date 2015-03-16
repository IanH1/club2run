// Create the collection
Training = new Mongo.Collection("training");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new training document.
         */
        insertTraining: function(training) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            training = _.extend(training,
                {clubId: Meteor.user().profile.clubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the training is valid
            check(training, Schema.Training);

            // Insert the new training
            var trainingId = Training.insert(training);

            return { _id: trainingId };
        },

        /*
         * Update a training document.
         */
        updateTraining: function(training, modifier, trainingId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            training = _.extend(training,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the training is valid
            check(training, Schema.Training);

            // Update the training
            Training.update(trainingId, { $set: training });
        },

        /*
         * Delete a training document.
         */
        deleteTraining: function(training) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the training
            Training.remove(training._id);
        }
    });
}
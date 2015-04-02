// Create the collection
Training = new Mongo.Collection("training");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a training.
         *
         * @param   training - the training to insert
         *
         * @return  The id of the inserted training
         */
        insertTraining: function(training) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            training = _.extend(training,
                {clubId: Meteor.user().profile.currentClubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the training is valid
            check(training, Schema.Training);

            // Insert the new training
            var trainingId = Training.insert(training);

            Meteor.call("sendTrainingEmail", training, trainingId);

            return { _id: trainingId };
        },

        /*
         * Update a training.
         *
         * @param   training - the training to update
         * @param   modifier - modifier generated from the form values
         * @param   trainingId - the training id
         */
        updateTraining: function(training, modifier, trainingId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], training.clubId)) {
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
         * Delete a training.
         *
         * @param   training - the training to delete
         */
        deleteTraining: function(training) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], training.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the training
            Training.remove(training._id);
        },

        /*
         * Send training email.
         *
         * @param   training -
         */
        sendTrainingEmail: function(training, trainingId) {
            if (trainingId) {
                var team = Team.findOne(training.teamId);
                for (var i = 0; i < team.squad.length; i++) {
                    var userId = team.squad[i].userId;
                    if (userId) {

                        // Fetch the user
                        var user = Meteor.users.findOne(userId);

                        // Create an in-app notification
                        Meteor.call("createAndInsertTrainingNotification", trainingId, userId);

                        // Send user email
                        Meteor.call("sendUserEmail", {
                            subject: "You have training",
                            message: SSR.render("playerNotification", {user: user}),
                            email: "c2rtest@mailinator.com"
                        });
                    }
                }
            }
        }
    });
}
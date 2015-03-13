// Create the collection
Training = new Mongo.Collection('training');

// Training methods
Meteor.methods({
    insertTraining: function(training) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
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

        return {
            _id: trainingId
        };
    },
    updateTraining: function(training, modifier, trainingId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        training = _.extend(training,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the training is valid
        check(training, Schema.Training);

        // Update the training
        Training.update(trainingId, {$set: training});
    },
    deleteTraining: function(trainingId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the training
        Training.remove(trainingId);
    }
});
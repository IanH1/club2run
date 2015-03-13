// Create the collection
Task = new Mongo.Collection('task');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new task.
         */
        insertTask: function(task) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            task = _.extend(task,
                {complete: false},
                {clubId: Club.find()},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the task is valid
            check(task, Schema.Task);

            // Insert the new task
            var taskId = Task.insert(task);

            return { _id: taskId };
        },

        /*
         * Update a task.
         */
        updateTask: function(task, modifier, taskId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            task = _.extend(task,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the task is valid
            check(task, Schema.Task);

            // Update the  task
            Task.update(taskId, { $set: task });
        },

        /*
         * Delete a task.
         */
        deleteTask: function(taskId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the task
            Task.remove(taskId);
        },

        /*
         * Toggle the task completion.
         */
        toggleTaskCompletion: function(taskId, complete) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the task
            Task.update(taskId, { $set: { complete: complete }});
        }
    });
}
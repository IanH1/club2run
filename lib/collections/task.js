Task = new Mongo.Collection('task');

Meteor.methods({
    insertTask: function(task) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        task = _.extend(task,
            {complete: false},
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the task is valid
        check(task, Schema.Task);

        // Insert the new task
        var taskId = Task.insert(task);

        return {
            _id: taskId
        };
    },
    updateTask: function(task, modifier, taskId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        task = _.extend(task,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the task is valid
        check(task, Schema.Task);

        // Update the existing task
        Task.update(taskId, {$set: task});
    },
    deleteTask: function(taskId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the task
        Task.remove(taskId);
    },
    toggleTask: function(taskId, complete) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Update the task
        Task.update(taskId, {$set: {complete: complete}});
    }
});
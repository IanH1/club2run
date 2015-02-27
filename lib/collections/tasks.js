Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    insertTask: function(task) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
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
        check(task, Schema.TaskSchema);

        // Insert the new task
        var taskId = Tasks.insert(task);

        // Add notification
        Meteor.call("insertNotification", {description: "Task created by " + Meteor.user().profile.fullName});

        return {
            _id: taskId
        };
    },
    updateTask: function(task, modifier, taskId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        task = _.extend(task,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the task is valid
        check(task, Schema.TaskSchema);

        // Update the existing task
        Tasks.update(taskId, {$set: task});

        // Add notification
        Meteor.call("insertNotification", {description: "Task updated by " + Meteor.user().profile.fullName});
    },
    deleteTask: function(taskId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing task
        Task.remove(taskId);

        // Add notification
        Meteor.call("insertNotification", {description: "Task deleted by " + Meteor.user().profile.fullName});
    }
});

// Collection hooks
Tasks.allow({
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
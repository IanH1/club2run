Template.club.helpers({
    notifications: function() {
        return Notifications.find({read: false}, {sort: {createdOn: -1}});
    }
});

Template.chatBox.helpers({
    messages: function() {
        return Messages.find({}, {sort: {createdOn: -1}});
    }
});

Template.chatMessage.helpers({
    ownMessage: function() {
        return Meteor.userId() === this.createdBy
    }
});

Template.chatMessage.events({
    'click .delete-message': function(e) {
        e.preventDefault();

        var messageId = this._id;
        bootbox.confirm("Are you sure you want to delete your message?", function(result) {
            if (result) {
                Meteor.call('deleteMessage', messageId, function (error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    }
                });
            }
        });
    }
});

Template.chatForm.events({
    'submit form': function(event, template) {
        event.preventDefault();

        Meteor.call('insertMessage', {message: template.find(".form-control").value}, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
        template.find(".form-control").value = "";
    }
});

Template.taskBox.created = function() {
    this.hideComplete = new ReactiveVar();
};

Template.taskBox.helpers({
    tasks: function() {
       if (Template.instance().hideComplete.get()) {
            return Tasks.find({complete: {$ne: true}});
        } else {
            return Tasks.find();
        }
    },
    taskCountOutstanding: function () {
        return Tasks.find({complete: {$ne: true}}).count();
    },
    hideComplete: function() {
        return Template.instance().hideComplete.get();
    }
});

Template.taskBox.events({
    "change .hide-completed input": function(event, template) {
        template.hideComplete.set(event.target.checked);
    }
});

Template.task.helpers({
    ownTask: function() {
        return Meteor.userId() === this.createdBy
    }
});

Template.task.events({
    'click .task-item': function(event) {
        var taskId = this._id;
        Meteor.call('toggleTask', taskId, $(event.target).is(":checked"), function (error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    },
    'click .task-delete': function() {
        var taskId = this._id;
        bootbox.confirm("Are you sure you want to delete your task?", function(result) {
            if (result) {
                Meteor.call('deleteTask', taskId, function (error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    }
                });
            }
        });
    }
});

Template.taskForm.events({
    'submit form': function(event, template) {
        event.preventDefault();

        Meteor.call('insertTask', {text: template.find(".form-control").value}, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
        template.find(".form-control").value = "";
    }
});
Template.taskPanel.created = function() {
    this.hideCompleted = new ReactiveVar();
};

Template.taskPanel.helpers({
    taskClass: function() {
        if (this.complete) {
            return 'done';
        } else {
            return '';
        }
    },
    tasks: function() {
        if (Template.instance().hideCompleted.get()) {
            return Tasks.find({complete: {$ne: true}});
        } else {
            return Tasks.find();
        }
    },
    taskCountOutstanding: function () {
        return Tasks.find({complete: {$ne: true}}).count();
    },
    ownTask: function() {
        return Meteor.userId() === this.createdBy
    },
    hideCompleted: function() {
        return Template.instance().hideCompleted.get();
    }
});

Template.taskPanel.events({
    'submit form': function(event, template) {
        event.preventDefault();

        Meteor.call('insertTask', {text: template.find(".form-control").value}, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
        template.find(".form-control").value = "";
    },
    'click .task-item': function(event) {
        var taskId = this._id;
        Meteor.call('toggleTask', taskId, event.target.checked, function (error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    },
    'click .task-delete': function() {
        var taskId = this._id;
        bootbox.confirm("Are you sure you want to delete this task?", function(result) {
            if (result) {
                Meteor.call('deleteTask', taskId, function (error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    }
                });
            }
        });
    },
    "change .hide-completed input": function(event, template) {
        template.hideCompleted.set(event.target.checked);
    }
});

Template.taskDropdown.helpers({
    tasks: function() {
        return Tasks.find({complete: {$ne: true}});
    }
});
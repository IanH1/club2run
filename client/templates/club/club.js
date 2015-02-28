Template.club.helpers({
    notifications: function() {
        return Notifications.find({read: false}, {sort: {createdOn: -1}});
    },
    tasks: function() {
        return Tasks.find({complete: {$ne: true}});
    },
    taskCountOutstanding: function () {
        return Tasks.find({completed: {$ne: true}}).count();
    }
});

Template.club.events({
    'click .taskItem': function(e) {
        Tasks.update(this._id, {$set: {complete: $(event.target).is(':checked')}});
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
            Meteor.call('deleteMessage', messageId, function (error) {
                if (error) {
                    FlashMessages.sendError(error.reason);
                }
            });
        });
    }
});

Template.chatForm.events({
    'submit form': function(e, template) {
        e.preventDefault();

        Meteor.call('insertMessage', {message: template.find(".form-control").value}, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    }
});
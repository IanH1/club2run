var messages = function() {
    return Messages.find({}, {sort: {createdOn: -1}});
};

Template.messagePanel.helpers({
    messages: messages,
    ownMessage: function() {
        return Meteor.userId() === this.createdBy
    }
});

Template.messagePanel.events({
    'submit form': function(event, template) {
        event.preventDefault();

        Meteor.call('insertMessage', {message: template.find(".form-control").value}, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
        template.find(".form-control").value = "";
    },
    'click .delete-message': function(event) {
        event.preventDefault();

        var messageId = this._id;
        bootbox.confirm("Are you sure you want to delete this message?", function(result) {
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

Template.messageDropdown.helpers({
    messages: messages
});
Template.eventEdit.events({
    'click .cancel': function(event, template) {
        Router.go('eventList');
    },
    'click .delete': function(event, template) {
        Meteor.call('deleteEvent', this._id, this.type, function(error, result) {
            if (error) {
                FlashMessages.sendError(error.reason);
            } else {
                FlashMessages.sendSuccess("Event successfully deleted.");
                Router.go('eventList');
            }
        });
    }
});

AutoForm.addHooks('editEvent', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Event successfully updated.");
        Router.go('eventList');
    }
});
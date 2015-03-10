Template.eventEdit.events({
    'click .cancel': function() {
        Router.go('eventList');
    },
    'click .delete': function() {
        var eventId = this._id;
        bootbox.confirm("Are you sure you want to delete this event?", function(result) {
            if (result) {
                Meteor.call('deleteEvent', eventId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Event successfully deleted.");
                        Router.go('eventList');
                    }
                });
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
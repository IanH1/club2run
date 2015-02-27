Template.eventEdit.events({
    'click .cancel': function(event, template) {
        Router.go('eventList');
    },
    'click .delete': function(event, template) {
        var eventId = this._id;
        bootbox.confirm("Are you sure you want to delete " + this.description + "?", function(result) {
            if (result) {
                Meteor.call('deleteEvent', eventId, function(error, result) {
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
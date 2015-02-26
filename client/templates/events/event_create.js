Template.eventCreate.helpers({
    eventType: function() {
        return Session.get('eventType');;
    },
    eventDate: function() {
        return Session.get('eventDate');;
    }
});

Template.eventCreate.events({
    'click .cancel': function(event, template) {
        Router.go('eventList');
    }
});

AutoForm.addHooks('createEvent', {
    onSuccess: function(operation, result, template) {
        FlashMessages.sendSuccess("Event successfully created.");
        Router.go('eventList');
    }
});
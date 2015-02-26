Template.eventCreate.helpers({
    eventType: function() {
        return Session.get('eventType');;
    }
});

Template.eventCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('eventList');
    }
});

AutoForm.addHooks('createEvent', {
    onSuccess: function() {
        Router.go('eventList');
    }
});


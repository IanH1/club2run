Template.eventEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('eventList');
    }
});

AutoForm.addHooks('editEvent', {
    onSuccess: function() {
        Router.go('eventList');
    }
});
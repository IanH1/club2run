Template.eventViewModal.helpers({
    event: function() {
        return Events.findOne(Session.get('eventId'));
    }
});
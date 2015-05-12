Template.eventCreate.events({
    'click .cancel': function() {
        Router.go("eventList");
    }
});

Template.eventCreate.helpers({
    defaultType: function() {
        return Session.get("eventType");
    },
    defaultStartDate: function() {
        var startDate = Session.get("eventDate");
        if (startDate) {
            return startDate;
        }
    },
    defaultEndDate: function() {
        var startDate = Session.get("eventDate");
        if (startDate) {
            return moment(startDate).add(1, "hours").toDate();
        }
    }
});

AutoForm.hooks({
    createEvent: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("eventList");
        }
    }
});
Template.eventList.helpers({
    events: function() {
        if (Session.get('eventSearchCriteria')) {
            return Events.find({opponent: new RegExp(Session.get('eventSearchCriteria'))}, {sort: {startTime: -1}});
        } else {
            return Events.find({}, {sort: {startTime: -1}});
        }
    }
});

Template.eventList.events({
});
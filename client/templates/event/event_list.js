Template.eventList.helpers({
    events: function() {
        if (Session.get('eventSearchCriteria')) {
            return Events.find({opponent: new RegExp(Session.get('eventSearchCriteria'))}, {sort: {startTime: -1}});
        } else {
            return Events.find({}, {sort: {startTime: -1}});
        }
    },
    eventSearchCriteria: function() {
        return Session.get("eventSearchCriteria");
    }
});

Template.eventList.events({
    'click #searchBtn': function(e, tpl) {
        Session.set('eventSearchCriteria', tpl.find("#searchCriteria").value);
    },
    'click #resetBtn': function(e, tpl) {
        Session.set('eventSearchCriteria', null);
    }
});
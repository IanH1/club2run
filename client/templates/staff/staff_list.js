Template.staffList.helpers({
    staff: function() {
        if (Session.get('staffSearchCriteria')) {
            return Staff.find({fullName: new RegExp(Session.get('staffSearchCriteria'))}, {sort: {fullName: 1}});
        } else {
            return Staff.find({}, {sort: {fullName: 1}});
        }
    },
    staffSearchCriteria: function() {
        return Session.get("staffSearchCriteria");
    }
});

Template.staffList.events({
    'click #searchBtn': function(e, tpl) {
        Session.set('staffSearchCriteria', tpl.find("#searchCriteria").value);
    },
    'click #resetBtn': function(e, tpl) {
        Session.set('staffSearchCriteria', null);
    }
});
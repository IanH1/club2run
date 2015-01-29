Template.officalList.helpers({
    offical: function() {
        if (Session.get('officalSearchCriteria')) {
            return Officals.find({fullName: new RegExp(Session.get('officalSearchCriteria'))}, {sort: {fullName: 1}});
        } else {
            return Officals.find({}, {sort: {fullName: 1}});
        }
    },
    officalSearchCriteria: function() {
        return Session.get("officalSearchCriteria");
    }
});

Template.officalList.events({
    'click #searchBtn': function(e, tpl) {
        Session.set('officalSearchCriteria', tpl.find("#searchCriteria").value);
    },
    'click #resetBtn': function(e, tpl) {
        Session.set('officalSearchCriteria', null);
    }
});
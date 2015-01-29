Template.teamList.helpers({
    teams: function() {
        if (Session.get('teamSearchCriteria')) {
            return Teams.find({name: new RegExp(Session.get('teamSearchCriteria'))}, {sort: {name: 1}});
        } else {
            return Teams.find({}, {sort: {name: 1}});
        }
    },
    teamSearchCriteria: function() {
        return Session.get("teamSearchCriteria");
    }
});

Template.teamList.events({
    'click #searchBtn': function(e, tpl) {
        Session.set('teamSearchCriteria', tpl.find("#searchCriteria").value);
    },
    'click #resetBtn': function(e, tpl) {
        Session.set('teamSearchCriteria', null);
    }
});
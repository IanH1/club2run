Template.memberList.helpers({
    members: function() {
        if (Session.get("memberSearchCriteria")) {
            return Members.find({fullName: new RegExp(Session.get("memberSearchCriteria"), "i")}, {sort: {fullName: 1}});
        } else {
            return Members.find({}, {sort: {fullName: 1}});
        }
    },
    memberSearchCriteria: function() {
        return Session.get("memberSearchCriteria");
    }
});

Template.memberList.events({
    "click #searchBtn": function(e, tpl) {
        Session.set("memberSearchCriteria", tpl.find("#searchCriteria").value);
    },
    "click #resetBtn": function(e, tpl) {
        Session.set("memberSearchCriteria", null);
    }
});
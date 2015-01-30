Template.memberList.helpers({
    members: function() {
        if (Session.get("memberSearchCriteria")) {
            return Members.find({fullName: new RegExp(Session.get("memberSearchCriteria"), "i")}, {sort: {fullName: 1}});
        } else {
            return Members.find({}, {sort: {fullName: 1}});
        }
    }
});

Template.memberList.events({
});
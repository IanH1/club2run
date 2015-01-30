Template.staffList.helpers({
    staff: function() {
        if (Session.get('staffSearchCriteria')) {
            return Staff.find({fullName: new RegExp(Session.get('staffSearchCriteria'))}, {sort: {fullName: 1}});
        } else {
            return Staff.find({}, {sort: {fullName: 1}});
        }
    }
});

Template.staffList.events({
});
Template.officalList.helpers({
    offical: function() {
        if (Session.get('officalSearchCriteria')) {
            return Officals.find({fullName: new RegExp(Session.get('officalSearchCriteria'))}, {sort: {fullName: 1}});
        } else {
            return Officals.find({}, {sort: {fullName: 1}});
        }
    }
});

Template.officalList.events({
});
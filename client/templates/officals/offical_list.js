Template.officialList.helpers({
    tabularSelector: function() {
        return {clubId: Meteor.user().profile.clubId}
    }
});
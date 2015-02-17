Template.memberList.helpers({
    tabularSelector: function() {
        return {clubId: Meteor.user().profile.clubId}
    }
});
Template.club.helpers({
    tasks: function() {
        return Tasks.find({clubId: Meteor.user().profile.clubId});
    },
    taskCount: function() {
        return Tasks.find({clubId: Meteor.user().profile.clubId}).count();
    },
    taskCountOutstanding: function () {
        return Tasks.find({completed: {$ne: true}}).count();
    }
});

Template.club.events({
    'click .taskItem': function(e) {
        Tasks.update(this._id, {$set: {complete: $(event.target).is(':checked')}});
    }
});
Template.club.helpers({
    notifications: function() {
        return Notifications.find({read: false}, {sort: {createdOn: -1}});
    },
    messages: function() {
        return Messages.find({}, {sort: {createdOn: -1}});
    },
    tasks: function() {
        return Tasks.find({complete: {$ne: true}});
    },
    taskCountOutstanding: function () {
        return Tasks.find({completed: {$ne: true}}).count();
    }
});

Template.club.events({
    'click .taskItem': function(e) {
        Tasks.update(this._id, {$set: {complete: $(event.target).is(':checked')}});
    },
    'submit form': function(e){
        e.preventDefault();

        var fullName = Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
        Messages.insert({message: e.target.message.value, author: fullName});
    }
});
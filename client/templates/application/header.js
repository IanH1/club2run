Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function() {
        Router.go('profile');
    }
});

Template.messageDropdown.helpers({
    messages: Message.find({}, {sort: {createdOn: -1}})
});

Template.taskDropdown.helpers({
    tasks: function() {
        return Task.find({complete: {$ne: true}});
    }
});
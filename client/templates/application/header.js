Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function() {
        Router.go('profile');
    }
});

Template.messageDropdown.helpers({
    messages: Message.find({}, {sort: {createdOn: -1}})
});
Template.userEmail.helpers({
    email: function() {
        if (this.emails) {
            return this.emails[0].address;
        }
    }
});

Template.userEmail.events({
    'click .cancel': function() {
        Router.go('userList');
    }
});

AutoForm.addHooks('emailUser', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Email successfully sent.");
        Router.go('userList');
    }
});
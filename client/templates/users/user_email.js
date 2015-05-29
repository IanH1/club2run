Template.userEmail.helpers({
    email: function() {
        if (this.emails) {
            return this.emails[0].address;
        }
    }
});

Template.userEmail.events({
    "submit .email-user": function(event) {
        event.preventDefault();

        // Send user email
        Meteor.call("sendUserEmail", this.emails[0].address, event.target.subject.value, event.target.message.value);

        // Display confirmation
        FlashMessages.sendSuccess("Email successfully sent.");
        Router.go("userList");
    },
    'click .cancel': function() {
        Router.go("userList");
    }
});
Template.memberEmail.events({
    'click .cancel': function(e, tpl) {
        Router.go('memberList');
    }
});

AutoForm.addHooks('emailMember', {
    onSuccess: function() {

        // Display confirmation message
        FlashMessages.sendSuccess("Email successfully sent.");

        Router.go('memberList');
    }
});
Template.memberCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('memberList');
    }
});

AutoForm.addHooks('createMember', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Member successfully created.");
        Router.go('memberList');
    }
});
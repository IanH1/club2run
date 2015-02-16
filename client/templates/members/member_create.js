Template.memberCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('memberList');
    }
});

AutoForm.addHooks('createMember', {
    onSuccess: function() {
        Router.go('memberList');
    }
});
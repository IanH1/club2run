Template.memberEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('memberList');
    }
});

AutoForm.addHooks('editMember', {
    onSuccess: function() {
        Router.go('memberList');
    }
});
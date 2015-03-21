Template.teamEdit.events({
    'click .cancel': function() {
        Router.go('teamList');
    }
});

AutoForm.hooks({
    editTeam: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("teamList");
        }
    }
});
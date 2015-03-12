Template.teamEdit.events({
    'click .cancel': function() {
        Router.go('teamList');
    },
    'click .delete': function() {
        var teamId = this._id;
        bootbox.confirm("Are you sure you want to delete this team?", function(result) {
            if (result) {
                Meteor.call('deleteTeam', teamId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Team successfully deleted.");
                        Router.go('teamList');
                    }
                });
            }
        });
    }
});

AutoForm.addHooks('editTeam', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('teamList');
    }
});
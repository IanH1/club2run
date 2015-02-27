Template.teamEdit.events({
    'click .cancel': function(e, tpl) {
        Router.go('teamList');
    },
    'click .delete': function(event, template) {
        var teamId = this._id;
        bootbox.confirm("Are you sure you want to delete " + this.name + "?", function(result) {
            if (result) {
                Meteor.call('deleteTeam', teamId, function(error, result) {
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
        FlashMessages.sendSuccess("Team successfully updated.");
        Router.go('teamList');
    }
});
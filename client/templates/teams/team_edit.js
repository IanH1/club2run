Template.teamEdit.events({
    'click .cancel': function() {
        Router.go('teamList');
    }
});

AutoForm.hooks({
    editTeam: {
        //onSubmit: function(updatedTeam) {
        //    var autoForm = this;
        //    Meteor.call("updateTeam", updatedTeam, Session.get("currentClub")._id, function(error) {
        //        if (error) {
        //            autoForm.done(error);
        //        } else {
        //            autoForm.done();
        //        }
        //    });
        //    return false;
        //},
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("teamList");
        }
    }
});
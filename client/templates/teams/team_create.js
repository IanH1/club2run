Template.teamCreate.events({
    'click .cancel': function() {
        Router.go("teamList");
    }
});

AutoForm.hooks({
    createTeam: {
        onSubmit: function(insertedTeam) {
            var autoForm = this;
            Meteor.call("insertTeam", insertedTeam, Session.get("currentClub")._id, function(error) {
                if (error) {
                    autoForm.done(error);
                } else {
                    autoForm.done();
                }
            });
            return false;
        },
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("teamList");
        }
    }
});
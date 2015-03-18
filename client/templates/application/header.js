Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function() {
        Router.go('profile');
    }
});

Template.messageDropdown.helpers({
    messageBoards: function() {
        return MessageBoard.find({}, { sort: {createdOn: -1} });
    },
    fixture: function() {
        return Fixture.findOne(this.fixtureId);
    },
    team: function() {
        var fixture = Fixture.findOne(this.fixtureId);
        return Team.findOne(fixture.teamId);
    }
});
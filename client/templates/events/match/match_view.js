Template.matchView.helpers({
    team: function() {
        if (this.match.teamId) {
            return Team.findOne(this.match.teamId).name;
        }
    },
    player: function() {
        if (this.playerId) {
            return Meteor.users.findOne(this.playerId);
        }
    }
});

Template.matchView.events({
    'click .event-edit': function() {
        Router.go("eventEdit", {_id: this._id});
    },
    'click .team-selection': function() {
        Router.go("matchTeamSelection", {_id: this._id});
    },
});
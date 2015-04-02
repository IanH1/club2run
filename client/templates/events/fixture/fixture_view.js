Template.fixtureViewModal.helpers({
    fixture: function() {
        if (Session.get("showEventId")) {
            return Fixture.findOne(Session.get("showEventId"));
        }
    },
    team: function() {
        if (Session.get("showEventId")) {
            var fixture = Fixture.findOne(Session.get("showEventId"));
            if (fixture && fixture.teamId) {
                return Team.findOne(fixture.teamId);
            }
        }
    },
    official: function() {
        if (this.valueOf()) {
            return Official.findOne(this.valueOf());
        }
    },
    squadSelection: function() {
        if (Session.get("showEventId")) {
            return SquadSelection.findOne({ fixtureId: Session.get("showEventId") });
        }
    },
    player: function() {
        if (this.userId) {
            return Meteor.users.findOne(this.userId);
        }
    },
    playerStatusClass: function() {
        return cssAvailabilityClass(this.availability);
    },
    currentUserInvite: function() {
        if (Session.get("showEventId")) {
            var squadSelection = SquadSelection.findOne({ fixtureId: Session.get("showEventId") });
            if (squadSelection && squadSelection.squad) {
                return _.find(squadSelection.squad, function(player) {
                    if (player.userId === Meteor.userId()) {
                        return player;
                    }
                });
            }
        }
    },
    currentUserStatusClass: function() {
        if (Session.get("showEventId")) {
            var squadSelection = SquadSelection.findOne({ fixtureId: Session.get("showEventId") });
            if (squadSelection && squadSelection.squad) {
                var invite = _.find(squadSelection.squad, function(player) {
                    if (player.userId === Meteor.userId()) {
                        return player;
                    }
                });
                return cssAvailabilityClass(invite.availability);
            }
        }
    }
});

Template.fixtureViewModal.events({
    'click .accept': function() {
        var squadSelection = SquadSelection.findOne({ fixtureId: Session.get("showEventId") });
        if (squadSelection) {
            updateFixtureInvite(squadSelection, "Available");
        }
    },
    'click .tenative': function() {
        var squadSelection = SquadSelection.findOne({ fixtureId: Session.get("showEventId") });
        if (squadSelection) {
            updateFixtureInvite(squadSelection, "Tentative");
        }
    },
    'click .decline': function() {
        var squadSelection = SquadSelection.findOne({ fixtureId: Session.get("showEventId") });
        if (squadSelection) {
            updateFixtureInvite(squadSelection, "Unavailable");
        }
    },
    'click [data-dismiss="modal"]': function() {
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
    }
});
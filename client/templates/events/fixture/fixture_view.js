Template.fixtureViewModal.helpers({
    event: function() {
        if (Session.get("showEventId")) {
            return CalendarEvent.findOne(Session.get("showEventId"));
        }
    },
    team: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event && event.fixture && event.fixture.teamId) {
                return Team.findOne(event.fixture.teamId);
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
    'click .edit': function() {
        var id = Session.get("showEventId");
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
        Router.go("eventEdit", {_id: id });
    },
    'click .delete': function() {
        bootbox.confirm("Are you sure you want to delete this fixture?", function(result) {
            if (result) {
                var calendarEvent = CalendarEvent.findOne(Session.get("showEventId"));
                Meteor.call('deleteCalendarEvent', calendarEvent, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Training successfully deleted.");
                        Session.set("showEventId", null);
                        Session.set("showEventType", null);
                        Session.set("showEventModal", false);
                        Router.go("eventList");
                    }
                });
            }
        });
    },
    'click [data-dismiss="modal"]': function() {
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
    }
});
Template.fixtureViewModal.helpers({
    event: function() {
        if (Session.get("showEventId")) {
            return CalendarEvent.findOne(Session.get("showEventId"));
        }
    },
    homeTeam: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event && event.fixture.homeTeamId) {
                return Team.findOne(event.fixture.homeTeamId);
            }
        }
    },
    awayTeam: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event && event.fixture.awayTeamId) {
                return Team.findOne(event.fixture.awayTeamId);
            }
        }
    },
    official: function() {
        if (this.valueOf()) {
            return Official.findOne(this.valueOf());
        }
    },
    player: function() {
        if (this.userId) {
            return Meteor.users.findOne(this.userId);
        }
    },
    playerStatusClass: function() {
        return Meteor.UtilFunctions.cssAvailabilityClass(this.availability);
    },
    currentUserInvite: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event.fixture.squad) {
                return _.find(event.fixture.squad, function(player) {
                    if (player.userId === Meteor.userId()) {
                        return player;
                    }
                });
            }
        }
    },
    currentUserStatusClass: function() {
        if (Session.get("showEventId")) {
            var event = CalendarEvent.findOne(Session.get("showEventId"));
            if (event.fixture.squad) {
                var selection = _.find(event.fixture.squad, function(player) {
                    if (player.userId === Meteor.userId()) {
                        return player;
                    }
                });
                return Meteor.UtilFunctions.cssAvailabilityClass(selection.availability);
            }
        }
    }
});

var updateSquadSelection = function(availability) {
    var event = CalendarEvent.findOne(Session.get("showEventId"));
    Meteor.call("updateSquadSelection", event, availability, function(error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
    });
};

Template.fixtureViewModal.events({
    'click .accept': function() {
        updateSquadSelection("Available");
    },
    'click .tenative': function() {
        updateSquadSelection("Tentative");
    },
    'click .decline': function() {
        updateSquadSelection("Unavailable");
    },
    'click .edit': function() {
        var id = Session.get("showEventId");
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
        Router.go("eventEdit", {_id: id });
    },
    'click .result': function() {
        var id = Session.get("showEventId");
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
        Router.go("fixtureResult", {_id: id });
    },
    'click .report': function() {
        var calendarEvent = CalendarEvent.findOne(Session.get("showEventId"));
        Session.set("showEventId", null);
        Session.set("showEventType", null);
        Session.set("showEventModal", false);
        Router.go("fixtureReport", {_id: calendarEvent.reportId });
    },
    'click .delete': function() {
        bootbox.confirm("Are you sure you want to delete this fixture?", function(result) {
            if (result) {
                var calendarEvent = CalendarEvent.findOne(Session.get("showEventId"));
                Meteor.call('deleteCalendarEvent', calendarEvent, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Fixture successfully deleted.");
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
// Create the collection
Events = new Mongo.Collection('events');

// Event methods
Meteor.methods({
    insertEvent: function(event) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        event = _.extend(event,
            {description: eventDescription(event)},
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the event is valid
        check(event, Schema.EventSchema);

        // Insert the new event
        var eventId = Events.insert(event);

        // Add notification
        if (event.type === "Match") {

            var team = Teams.findOne(event.match.teamId);

            var players = [];
            if (team) {
                for (var i = 0; i < team.players.length; i++) {
                    players.push({playerId: team.players[i]});
                   // Meteor.call("insertTeamSelection", {matchId: eventId, playerId: team.players[i]});
                }
                Meteor.call("insertTeamSelection", {matchId: eventId, players: players});
            }

            Meteor.call("insertNotification", {
                type: event.type,
                match : {
                    memberId: Meteor.user()._id,
                    matchId: eventId
                }
            });
        } else if (event.type === "Meeting") {
            Meteor.call("insertNotification", {
                type: event.type,
                meeting : {
                    memberId: Meteor.user()._id,
                    meetingId: eventId
                }
            });
        } else if (event.type === "Training") {

        }

        return {
            _id: eventId
        };
    },
    updateEvent: function(event, modifier, eventId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        event = _.extend(event,
            {description: eventDescription(event)},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the event is valid
        check(event, Schema.EventSchema);

        // Update the existing event
        Events.update(eventId, {$set: event});
    },
    updateEventInvite: function(eventId, memberId, status) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Update the existing event
        Events.update({ _id: eventId, 'meeting.invitees.memberId': memberId }, { $set: {'meeting.invitees.$.status': status }});
    },
    deleteEvent: function(eventId, eventType) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing event
        Events.remove(eventId);
    }
});

function eventDescription(event) {
    switch(event.type) {
        case 'Match':
            return event.match.opponent;
        case 'Training':
            return "Training - " + event.training.team;
        case 'Meeting':
            return event.meeting.title;
    }
};

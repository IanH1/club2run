// Create the collection
CalendarEvent = new Meteor.Collection("calendar_event", {
    transform: function(doc) {
        doc.fixtureResultSubmitted = function() {
            if (doc.fixture) {
                return doc.fixture.homeScore != null && doc.fixture.awayScore != null;
            }
        }
        return doc;
    }
});

// Server privileged methods
if (Meteor.isServer) {

   /*
    * Send player notifications.
    *
    * @param   event
    */
    var sendPlayerNotifications = function(event) {

        if (event.fixture.squad) {

            // Build the email template
            SSR.compileTemplate("playerNotification", Assets.getText("email_templates/fixture_player_notification.html"));
            Template.playerNotification.helpers({
                fixture: function() {
                    return event.fixture;
                },
                link: function() {
                    return "LINK";
                }
            });

            // Send a notification to each player
            for (var i = 0; i < event.fixture.squad.length; i++) {
                var userId = event.fixture.squad[i].userId;
                if (userId) {

                    // Fetch the user
                    var user = Meteor.users.findOne(userId);

                    // Create an in-app notification
                    Meteor.call("createAndInsertNotification", event._id, "You have been selected", userId);

                    // Send user email
                    //Meteor.call("sendUserEmail", user.emails[0].address, "You have been selected", SSR.render("playerNotification", {event: event}));
                }
            }
        }
    };

    /*
     * Send coach notifications.
     *
     * @param   event
     */
    var sendCoachNotifications = function(event) {
        var team = Team.findOne(event.fixture.homeTeamId);

        if (team.coachIds) {

            // Build the email template
            SSR.compileTemplate("coachNotification", Assets.getText("email_templates/fixture_coach_notification.html"));
            Template.coachNotification.helpers({
                fixture: function () {
                    return event.fixture;
                },
                link: function () {
                    return "LINK";
                }
            });


            // Send a notification to each coach
            for (var i = 0; i < team.coachIds.length; i++) {
                var userId = team.coachIds[i];
                if (userId) {

                    // Fetch the user
                    var user = Meteor.users.findOne(userId);

                    // Create an in-app notification
                    Meteor.call("createAndInsertNotification", event._id, "You are required to coach", userId);

                    // Send user email
                    Meteor.call("sendUserEmail", user.emails[0].address, "You are required to coach", SSR.render("coachNotification", {event: event}));
                }
            }
        }
    };

    /*
     * Send training invite notifications.
     *
     * @param   event
     */
    var sendTrainingInviteNotifications = function(event) {

        // Build the email template
        SSR.compileTemplate("trainingPlayerNotification", Assets.getText("email_templates/training_player_notification.html"));
        Template.trainingPlayerNotification.helpers({
            training: function () {
                return event.training;
            },
            link: function () {
                return "LINK";
            }
        });

        var team = Team.findOne(event.training.teamId);
        for (var i = 0; i < team.players.length; i++) {
            var userId = team.players[i].userId;
            if (userId) {

                // Fetch the user
                var user = Meteor.users.findOne(userId);

                // Create an in-app notification
                Meteor.call("createAndInsertNotification", event._id, "You have training", userId);

                // Send user email
                Meteor.call("sendUserEmail", user.emails[0].address, "You are required to coach", SSR.render("trainingPlayerNotification", {event: event}));
            }
        }
    };

    Meteor.methods({

        /*
         * Insert a CalendarEvent.
         *
         * @param   calendarEvent - the CalendarEvent to insert
         *
         * @return  The id of the inserted CalendarEvent
         */
        insertCalendarEvent: function(calendarEvent) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            calendarEvent = _.extend(calendarEvent,
                {clubId: Meteor.user().profile.currentClubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            var club = Club.findOne(Meteor.user().profile.currentClubId);

            // Apply type specific values
            if (calendarEvent.type === "fixture") {

                // Initialse the squad
                calendarEvent.fixture.squad = [];
                for (var i = 0; i < club.type.numberOfPlayers; i++) {
                    calendarEvent.fixture.squad.push({
                        squadNumber: i + 1
                    });
                }
            }

            // Check if the CalendarEvent is valid
            check(calendarEvent, Schema.CalendarEvent);

            // Insert the new CalendarEvent
            var calendarEventId = CalendarEvent.insert(calendarEvent);

            // Send notifications
            if (calendarEvent.type === "fixture") {

                // Send the notifications
                sendPlayerNotifications(calendarEvent);
                sendCoachNotifications(calendarEvent);

            } else if (calendarEvent.type === "meeting") {
                // TO DO - ADD MEETING EMAIL
            } else if (calendarEvent.type === "training") {
                sendTrainingInviteNotifications(calendarEvent);
            }

            // Create a message board for the fixture
            Meteor.call("createAndInsertMessageBoard", calendarEventId);

            return { _id: calendarEventId };
        },

        /*
         * Update a CalendarEvent.
         *
         * @param   calendarEvent - the CalendarEvent to update
         * @param   modifier - modifier generated from the form values
         * @param   calendarEventId - the CalendarEvent id
         */
        updateCalendarEvent: function(calendarEvent, modifier, calendarEventId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], calendarEvent.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            calendarEvent = _.extend(calendarEvent,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the CalendarEvent is valid
            check(calendarEvent, Schema.CalendarEvent);

            // Update the CalendarEvent
            CalendarEvent.update(calendarEventId, { $set: calendarEvent });

            // Send notifications
            if (calendarEvent.type === "fixture") {

                // Send the notifications
                sendPlayerNotifications(calendarEvent);
                sendCoachNotifications(calendarEvent);

            } else if (calendarEvent.type === "meeting") {
                // TO DO - ADD MEETING EMAIL
            }
        },

        /*
         * Delete a CalendarEvent.
         *
         * @param   calendarEvent - the CalendarEvent to delete
         */
        deleteCalendarEvent: function(calendarEvent) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], calendarEvent.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the message board
            Meteor.call("deleteMessageBoard", MessageBoard.findOne({ eventId: calendarEvent._id }));

            // Delete the CalendarEvent
            CalendarEvent.remove(calendarEvent._id);
        },

        /*
         * Update a squad selection for the current user
         *
         * @param   calendarEvent - the calendar event to update
         * @param   availability - the availability to set
         */
        updateSquadSelection: function(calendarEvent, availability) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], calendarEvent.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the squad selection
            CalendarEvent.update({_id: calendarEvent._id, 'fixture.squad.userId': Meteor.userId()}, {$set: {'fixture.squad.$.availability': availability}});
        },

        /*
         * Update a fixture result.
         *
         * @param   calendarEvent - the calendar event to update
         * @param   modifier - modifier generated from the form values
         * @param   calendarEventId - the calendar event id
         */
        updateFixtureResult: function(calendarEvent, modifier, calendarEventId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], calendarEvent.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the fixture result
            CalendarEvent.update(calendarEventId, modifier);

            // Create a match report
            if (!calendarEvent.reportId) {
                var reportId = Meteor.call("createAndInsertMatchReport", calendarEventId)._id;

                // Update the fixture with the new article id
                CalendarEvent.update(calendarEventId, { $set: { reportId: reportId }});
            }
        },

        /*
         * Update a meeting invite for the current user.
         *
         * @param   calendarEvent - the calendar event to update
         * @param   availability - the availability to set
         */
        updateMeetingInvite: function(calendarEvent, availability) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], calendarEvent.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the meeting
            CalendarEvent.update({ _id: calendarEvent._id, 'meeting.attendeeIds.userId': Meteor.userId() }, { $set: { 'meeting.attendeeIds.$.availability': availability }});
        }
    });
}
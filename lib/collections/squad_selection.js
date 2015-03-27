// Create the collection
SquadSelection = new Mongo.Collection("squad_selection");

// Server privileged methods
if (Meteor.isServer) {

    /*
     * Send player notifications.
     *
     * @param   squadSelection
     * @param   fixture
     * @param   clubId
     */
    var sendPlayerNotifications = function(squadSelection, fixture, clubId) {
        if (squadSelection.squad) {

            // Build the email template
            SSR.compileTemplate("playerNotification", Assets.getText("fixture_player_notification.html"));
            Template.playerNotification.helpers({
                fixture: function() {
                    return fixture;
                },
                link: function() {
                    return "THIS IS THE LINK";
                }
            });

            // Send a notification to each player
            for (var i = 0; i < squadSelection.squad.length; i++) {
                var userId = squadSelection.squad[i].userId;
                if (userId) {

                    // Fetch the user
                    var user = Meteor.users.findOne(userId);

                    // Create an in-app notification
                    Meteor.call("createAndInsertNotification", fixture._id, userId, clubId);

                    // Send user email
                    Meteor.call("sendUserEmail", {
                        subject: "You have been selected",
                        message: SSR.render("playerNotification", { user: user }),
                        email: "c2rtest@mailinator.com"
                    }, clubId);
                }
            }
        }
    };

    /*
     * Send coach notifications.
     *
     * @param   team
     * @param   clubId
     */
    var sendCoachNotifications = function(team, clubId) {
        if (team.coachIds) {

            // Build the email template
            SSR.compileTemplate("coachNotification", Assets.getText("fixture_coach_notification.html"));
            Template.coachNotification.helpers({
                fixture: function() {
                    return fixture;
                },
                link: function() {
                    return "THIS IS THE LINK";
                }
            });

            // Send a notification to each coach
            for (var i = 0; i < team.coachIds.length; i++) {
                var userId = team.coachIds[i];
                if (userId) {

                    // Fetch the user
                    var user = Meteor.users.findOne(userId);

                    // Send user email
                    Meteor.call("sendUserEmail", {
                        subject: "You are required to coach",
                        message: SSR.render("coachNotification", { user: user }),
                        email: "c2rtest@mailinator.com"
                    }, clubId);
                }
            }
        }
    };

    /*
     * Send official notifications.
     *
     * @param   official
     * @param   clubId
     */
    var sendOfficialNotifications = function(fixture, clubId) {
        if (fixture.officialIds) {

            // Build the email template
            SSR.compileTemplate("officialNotification", Assets.getText("fixture_official_notification.html"));
            Template.officialNotification.helpers({
                fixture: function() {
                    return fixture;
                },
                link: function() {
                    return "THIS IS THE LINK";
                }
            });

            // Send a notification to each official
            for (var i = 0; i < fixture.officialIds.length; i++) {
                var userId = fixture.officialIds[i];
                if (userId) {

                    // Fetch the user
                    var user = Meteor.users.findOne(userId);

                    // Send user email
                    Meteor.call("sendUserEmail", {
                        subject: "You are required to officiate",
                        message: SSR.render("officialNotification", { user: user }),
                        email: "c2rtest@mailinator.com"
                    }, clubId);
                }
            }
        }
    };

    Meteor.methods({

        /*
         * Create and insert a new squad selection.
         *
         * @param   fixtureId - the fixture id to assign
         * @param   teamId - the team id to assign
         * @param   clubId - the current club
         *
         * @return  The id of the inserted squad selection
         */
        createAndInsertSquadSelection: function(fixtureId, teamId, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            var club = Club.findOne(clubId);
            var team = Team.findOne(teamId);

            // Copy the squad from the default squad selected on the team
            var squad = [];
            for (var i = 0; i < club.type.numberOfPlayers; i++) {
                var teamSquad = team.squad[i];
                if (teamSquad) {
                    squad.push({
                        squadNumber: teamSquad.squadNumber,
                        userId: teamSquad.userId,
                        position: teamSquad.position
                    });
                } else {
                    squad.push({
                        squadNumber: i + 1
                    });
                }
            }

            // Create the new squad selection
            var squadSelection = {
                fixtureId: fixtureId,
                teamId: teamId,
                clubId: clubId,
                published: false,
                squad: squad
            };

            // Check if the squad selection is valid
            check(squadSelection, Schema.SquadSelection);

            // Insert the new squad selection
            var squadSelectionId = SquadSelection.insert(squadSelection);

            // Assign everyone in the team the player role for this fixture
            for (var i = 0; i < team.squad.length; i++) {
                if (squadSelection.squad[i].userId) {
                    Roles.addUsersToRoles(squadSelection.squad[i].userId, ["player"], fixtureId);
                }
            }

            return { _id: squadSelectionId };
        },

        /*
         * Publish a squad selection. This method will notify the players, coaches and
         * officials via thier preferred contact method.
         *
         * @param   id - the squad selection to publish
         * @param   clubId - the current club
         *
         * @return  The id of the inserted squad selection
         */
        publishSquadSelection: function(id, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            var squadSelection = SquadSelection.findOne(id);
            var fixture = Fixture.findOne(squadSelection.fixtureId);
            var team = Team.findOne(fixture.teamId);

            // Send the notifications
            sendPlayerNotifications(squadSelection, fixture, clubId);
            sendCoachNotifications(team, clubId);
            sendOfficialNotifications(fixture, clubId);

            // Update the squad selection
            SquadSelection.update(id, { $set: { published: true, publishedOn: new Date(), publishedBy: Meteor.userId() }});
        },

        /*
         * Update a squad selection.
         *
         * @param   squadSelection - the squadSelection to update
         * @param   modifier - modifier generated from the form values
         * @param   squadSelectionId - the squadSelectionId id
         */
        updateSquadSelection: function(squadSelection, modifier, squadSelectionId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], squadSelection.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            squadSelection = _.extend(squadSelection,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the squad selection is valid
            check(squadSelection, Schema.SquadSelection);

            // Update the squad selection
            SquadSelection.update(squadSelectionId, { $set: squadSelection });
        },

        /*
         * Update a squad selection invite for the current user
         *
         * @param   squadSelection - the squadSelection to update
         * @param   availability - the availability to set
         */
        updateSquadSelectionInvite: function(squadSelection, availability) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager", "user"], squadSelection.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the squad selection
            SquadSelection.update({ _id: squadSelection._id, 'squad.userId': Meteor.userId() }, { $set: { 'squad.$.availability': availability }});
        },

        /*
         * Delete a squad selection.
         *
         * @param   squadSelection - the squad selection to delete
         */
        deleteSquadSelection: function(squadSelection) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], squadSelection.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the squad selection
            SquadSelection.remove(squadSelection._id);
        }
    });
}
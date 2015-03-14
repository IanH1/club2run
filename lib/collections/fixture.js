// Create the collection
Fixture = new Mongo.Collection('fixture');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new fixture. This method will also create and insert a related team selection document.
         */
        insertFixture: function(fixture) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            fixture = _.extend(fixture,
                {clubId: Meteor.user().profile.clubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the fixture is valid
            check(fixture, Schema.Fixture);

            // Insert the new fixture
            var fixtureId = Fixture.insert(fixture);

            // Create and insert a team selection for the new fixture
            var teamSelectionId = Meteor.call("createAndInsertTeamSelection", fixtureId, fixture.teamId);

            // Update the fixture with the team selection id
            Fixture.update(fixtureId, { $set: { teamSelectionId: teamSelectionId }});

            return { _id: fixtureId };
        },

        /*
         * Update a fixture.
         */
        updateFixture: function(fixture, modifier, fixtureId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            fixture = _.extend(fixture,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the fixture is valid
            check(fixture, Schema.Fixture);

            // Update the fixture
            Fixture.update(fixtureId, { $set: fixture });
        },

        /*
         * Delete a fixture. This method will also delete the related team selection document.
         */
        deleteFixture: function(fixture) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the fixture
            Fixture.remove(fixture._id);

            // Delete the team selection for this fixture
            Meteor.call('deleteTeamSelectionByFixtureId', fixture._id);
        }
    });
}
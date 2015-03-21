// Create the collection
Fixture = new Mongo.Collection("fixture");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a fixture. This method will also create and insert a related team
         * selection and message board.
         *
         * @param   fixture - the fixture to insert
         * @param   clubId - the current club
         *
         * @return  The id of the inserted fixture
         */
        insertFixture: function(fixture, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            fixture = _.extend(fixture,
                {clubId: clubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the fixture is valid
            check(fixture, Schema.Fixture);

            // Insert the new fixture
            var fixtureId = Fixture.insert(fixture);

            // Create and insert the new fixture message board
            var messageBoardId = Meteor.call("createAndInsertMessageBoard", fixtureId, clubId)._id;

            // Update the fixture with the new message board id
            Fixture.update(fixtureId, { $set: { messageBoardId: messageBoardId }});

            // Create and insert a squad selection
            var squadSelectionId = Meteor.call("createAndInsertSquadSelection", fixtureId, fixture.teamId, clubId)._id;

            // Update the fixture with the new squad selection id
            Fixture.update(fixtureId, { $set: { squadSelectionId: squadSelectionId }});

            return { _id: fixtureId };
        },

        /*
         * Update a fixture.
         *
         * @param   fixture - the fixture to update
         * @param   modifier - modifier generated from the form values
         * @param   fixtureId - the fixture id
         */
        updateFixture: function(fixture, modifier, fixtureId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], fixture.clubId)) {
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
         * Delete a fixture. This method will also delete the related squad selection and
         * message board.
         *
         * @param   fixture - the fixture to delete
         */
        deleteFixture: function(fixture) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], fixture.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the fixture
            Fixture.remove(fixture._id);

            // Delete the message board
            Meteor.call("deleteMessageBoard", MessageBoard.findOne(fixture.messageBoardId));

            // Delete the squad selection
            Meteor.call("deleteSquadSelection", SquadSelection.findOne(fixture.squadSelectionId));
        }
    });
}
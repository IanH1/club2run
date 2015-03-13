// Create the collection
Fixture = new Mongo.Collection('fixture');

// Fixture methods
Meteor.methods({
    insertFixture: function(fixture) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        fixture = _.extend(fixture,
            {clubId: Club.find()},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the fixture is valid
        check(fixture, Schema.Fixture);

        // Insert the new fixture
        var fixtureId = Fixture.insert(fixture);

        // Create a team selection for the created fixture
        Meteor.call('createTeamSelectionForFixture', fixtureId, fixture);

        return {
            _id: fixtureId
        };
    },
    updateFixture: function(fixture, modifier, fixtureId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        fixture = _.extend(fixture,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the fixture is valid
        check(fixture, Schema.Fixture);

        // Update the fixture
        Fixture.update(fixtureId, {$set: fixture});
    },
    deleteFixture: function(fixtureId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the fixture
        Fixture.remove(fixtureId);

        // Delete the team selection for this fixture too
        Meteor.call('deleteTeamSelectionForFixture', fixtureId);
    }
});
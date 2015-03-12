// Create the collection
Fixture = new Mongo.Collection('fixture');

// Fixture methods
Meteor.methods({
    insertFixture: function(fixture) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
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

        return {
            _id: fixtureId
        };
    },
    updateFixture: function(fixture, modifier, fixtureId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
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
    ////updateEventInvite: function(eventId, memberId, status) {
    ////
    ////    // Check user permissions
    ////    if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
    ////        throw new Meteor.Error(403, "Access denied")
    ////    }
    ////
    ////    // Update the existing event
    ////    Events.update({ _id: eventId, 'fixture.invitees.memberId': memberId }, { $set: {'fixture.invitees.$.status': status }});
    ////},
    deleteFixture: function(fixtureId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the fixture
        Fixture.remove(fixtureId);
    }
});
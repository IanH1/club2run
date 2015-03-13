Club = new Mongo.Collection('club');

Meteor.methods({
    updateClub: function(club, modifier, clubId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        club = _.extend(club,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the club is valid
        check(club, Schema.Club);

        // Update the existing club
        Club.update(clubId, {$set: club});
    }
});
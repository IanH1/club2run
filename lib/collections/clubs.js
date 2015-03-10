Clubs = new Mongo.Collection('clubs');

Meteor.methods({
    updateClub: function(club, modifier, clubId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        club = _.extend(club,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the club is valid
        check(club, Schema.ClubSchema);

        // Update the existing club
        Clubs.update(clubId, {$set: club});
    }
});
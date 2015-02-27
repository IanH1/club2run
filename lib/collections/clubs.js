Clubs = new Mongo.Collection('clubs');

Meteor.methods({
    updateClub: function(club, modifier, clubId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
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

// Client side permissions
Clubs.allow({
    insert: function() {
        return false;
    },
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin', 'club_admin'], Roles.GLOBAL_GROUP);
    },
    remove: function() {
        return false;
    }
});
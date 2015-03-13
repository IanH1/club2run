// Create the collection
Club = new Mongo.Collection('club');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Update a club.
         */
        updateClub: function(club, modifier, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            club = _.extend(club,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the club is valid
            check(club, Schema.Club);

            // Update the club
            Club.update(clubId, { $set: club });
        }
    });
}
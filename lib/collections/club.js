// Create the collection
Club = new Mongo.Collection("club");

// Initalise Easy Search for this collection
Club.initEasySearch("name");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Update a club.
         *
         * @param   club - the club to update
         * @param   modifier - modifier generated from the form values
         * @param   clubId - the club id
         */
        updateClub: function(club, modifier, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], clubId)) {
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
// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new user, assigning them to the club.
         *
         * @param   user - the user to insert
         * @param   clubId - the current club
         *
         * @return  The id of the inserted user
         */
        insertUser: function(user, club) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], club._id)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Check if the user already exists
            var existingUser = Meteor.users.findOne({ 'emails.address': user.emails[0].address });
            if (existingUser == null) {

                // Create a new user
                user.profile = _.extend(user.profile,
                    {fullName: user.profile.firstName + " " + user.profile.lastName},
                    {name: user.profile.firstName + " " + user.profile.lastName},
                    {clubIds: [club._id]},
                    {createdOn: new Date()},
                    {createdBy: Meteor.userId()},
                    {modifiedOn: new Date()},
                    {modifiedBy: Meteor.userId()}
                );

                // Check if the user is valid
                check(user, Schema.User);

                // Add the user
                var userId = Accounts.createUser({email: user.emails[0].address, profile: user.profile});
                Accounts.sendEnrollmentEmail(userId);

                // Created the user now add the user to the club
                Meteor.call("joinClub", user, club);
            } else {

                // The user already exists, add the user to the club
                Meteor.call("joinClub", existingUser, club);
            }
        },

        updateUserCurrentClub: function(user, club) {

            // Check permissions
            //if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            //    throw new Meteor.Error(403, "Access denied");
            //}

            // Apply changes on top of original values, to ensure key values are restored


            // Update the user
            Meteor.users.update(user._id, { $set: { 'profile.currentClubId' : club._id }});
        },

        /*
         * Removes a user from a club.
         *
         * @param   user - the user to remove
         * @param   club - the current club
         */
        removeUser: function(user, club) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], club._id)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Remove the selected club from the users profile
            Meteor.users.update(user._id, { $pull: { 'profile.clubIds' : club._id }});

            // Remove the user roles for the selected club
            Roles.setUserRoles(user._id, [], clubId);

            // Send user email
            Meteor.call("sendUserEmail", {
                subject: "You are no longer a member of " + club.name,
                message: "You are no longer a member of " + club.name,
                email: user.emails[0].address
            }, club._id);
        },

        /*
         * Join a club.
         *
         * @param   user - the user to add
         * @param   club - the current club
         */
        joinClub: function(user, club) {

            // Check permissions
            if (!Meteor.user()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Add the selected club to the users profile
            if (user.profile.clubIds) {
                Meteor.users.update(user._id, { $push: { 'profile.clubIds' : club._id }});
            } else {
                Meteor.users.update(user._id, { $set: { 'profile.clubIds' : [club._id] }});
            }

            // Add the user role for the selected club
            Roles.addUsersToRoles(user._id, ["user"], club._id);

            // Send user email
            Meteor.call("sendUserEmail", {
                subject: "You are now a member of " + club.name,
                message: "You are now a member of " + club.name,
                email: user.emails[0].address
            }, club._id);
        },

        /*
         * Send an email to a user.
         *
         * @param   emailMessage - the email message to send
         * @param   clubId - the current club id
         */
        sendUserEmail: function(emailMessage, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Check if the email message is valid
            check(emailMessage, Schema.EmailMessage);

            // Don't block
            this.unblock();

            // Send email
            new Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN }).send({
                to: emailMessage.email,
                from: process.env.REPLY_TO,
                subject: emailMessage.subject,
                html: emailMessage.message
            });
        }
    });
}
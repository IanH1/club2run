// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new user, assigning them to the club.
         *
         * @param   user - the user to insert
         * @param   clubId - the club to assign to the user
         *
         * @return  The id of the inserted user
         */
        insertUser: function(user, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Check if the user already exists
            var existingUser = Meteor.users.findOne({ 'emails.address': user.emails[0].address });
            if (existingUser == null) {

                // Create a new user
                // Apply default values
                user.profile = _.extend(user.profile,
                    {fullName: user.profile.firstName + " " + user.profile.lastName},
                    {name: user.profile.firstName + " " + user.profile.lastName},
                    {clubIds: [clubId]},
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
                Meteor.call("joinClub", userId, clubId);
            } else {

                // The user already exists, add the user to the club
                Meteor.call("joinClub", existingUser._id, clubId);
            }
        },

        /*
         * Update a user.
         */
        updateUser: function(user, modifier, userId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply changes on top of original values, to ensure key values are restored
            var originalUser = Meteor.users.findOne(userId);
            if (originalUser) {
                user.profile = _.extend(originalUser.profile, user.profile);
            }

            // Apply default values
            user.profile = _.extend(user.profile,
                {fullName: user.profile.firstName + " " + user.profile.lastName},
                {name: user.profile.firstName + " " + user.profile.lastName},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the user is valid
            check(user, Schema.User);

            // Update the user
            Meteor.users.update(userId, { $set: { profile: user.profile }});
        },

        /*
         * Delete a user.
         */
        deleteUser: function(user) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the user
            Meteor.users.remove(user._id);
        },

        /*
         * Join a club.
         */
        joinClub: function(userId, clubId) {

            // Check permissions
            if (!Meteor.user()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Add the selected club id to the users profile
            var user = Meteor.users.findOne(userId);
            var club = Club.findOne(clubId);
            if (user && club && user.profile) {
                if (!user.profile.clubIds) {
                    user.profile.clubIds = [];
                }
                user.profile.clubIds.push(clubId);
            }

            // Update the user
            Meteor.users.update(user._id, { $set: { profile: user.profile }});

            // Add the user role for the selected club
            Roles.addUsersToRoles(user._id, ["user"], clubId);

            // Send user email
            Meteor.call("sendUserEmail", {
                subject: "You are now a member of " + club.name,
                message: "You are now a member of " + club.name,
                email: user.emails[0].address
            }, clubId);
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
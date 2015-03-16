// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new user.
         */
        insertUser: function(user) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            var clubId = Club.findOne();
            user.profile = _.extend(user.profile,
                {fullName: user.profile.firstName + " " + user.profile.lastName},
                {name: user.profile.firstName + " " + user.profile.lastName},
                {clubId: clubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the user is valid
            check(user, Schema.User);

            // Add the user
            var userId = Accounts.createUser({ email: user.emails[0].address, profile: user.profile });
            Accounts.sendEnrollmentEmail(userId);
            Roles.addUsersToRoles(userId, ["user"], clubId);
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
        joinClub: function(clubId) {

            // Check permissions
            if (!Meteor.user()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Add the club id to the user profile
            var user = Meteor.user();
            if (user && user.profile) {
                if (!user.profile.clubIds) {
                    user.profile.clubIds = [];
                }
                user.profile.clubIds.push(clubId);
            }

            // Update the user
            Meteor.users.update(user._id, { $set: { profile: user.profile }});
        },

        /*
         * Send an email to a user.
         */
        sendUserEmail: function(emailMessage) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
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
                html: "<html><head></head><body>" + emailMessage.message + "</body></html>",
                text: emailMessage.message
            });
        }
    });
}
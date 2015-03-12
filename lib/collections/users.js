if (Meteor.isServer) {
    Meteor.methods({
        insertUser: function (user) {

            // Check user permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied")
            }

            // Apply default values
            var fullName = user.profile.firstName + " " + user.profile.lastName;
            var clubId = Meteor.user().profile.clubId;
            user.profile = _.extend(user.profile,
                {fullName: fullName},
                {name: fullName},
                {clubId: clubId},
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
            Roles.addUsersToRoles(userId, ["user"], clubId);
        },
        updateUser: function (user, modifier, userId) {

            // Check user permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply changes on top of original values, to ensure key values are restored
            var originalUser = Meteor.users.findOne(userId);
            if (originalUser) {
                user.profile = _.extend(originalUser.profile, user.profile);
            }

            // Apply default values
            var fullName = user.profile.firstName + " " + user.profile.lastName;
            user.profile = _.extend(user.profile,
                {fullName: fullName},
                {name: fullName},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the user is valid
            check(user, Schema.User);

            // Update the existing user
            Meteor.users.update(userId, {$set: {profile: user.profile}});
        },
        deleteUser: function (userId) {

            // Check user permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the user
            Meteor.users.remove(userId);
        },
        sendUserEmail: function(emailMessage) {

            // Check if the email message is valid
            check(emailMessage, Schema.EmailMessage);

            this.unblock();

            // Send the email
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
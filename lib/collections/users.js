// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new user, assigning them to the current club.
         *
         * @param   user - the user to insert
         *
         * @return  The id of the inserted user
         */
        insertUser: function(user) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Fetch the current club
            var club = Club.findOne(Meteor.user().profile.currentClubId);

            // Check if the user already exists
            var existingUser = Meteor.users.findOne({ 'emails.address': user.emails[0].address });
            if (existingUser == null) {

                // Create a new user
                user.profile = _.extend(user.profile,
                    {fullName: user.profile.firstName + " " + user.profile.lastName},
                    {name: user.profile.firstName + " " + user.profile.lastName},
                    {memberships:[]},
                    {createdOn: new Date()},
                    {createdBy: Meteor.userId()},
                    {modifiedOn: new Date()},   
                    {modifiedBy: Meteor.userId()}
                );

                
                // Check if the user is valid
                check(user, Schema.User);

                // Add the user
                Meteor.call("createNewUser", user.emails[0].address, user, club,"Guest");

                if (user.profile.parentEmail1)
                {
                    Meteor.call("createNewUser", user.profile.parentEmail1, user, club,"Parent");
                }
                
                if (user.profile.parentEmail2)
                {
                    Meteor.call("createNewUser", user.profile.parentEmail2, user, club,"Parent");
                }

            } else {

                // The user already exists
                if (!Meteor.users.findOne({ _id: existingUser._id, 'profile.memberships.clubId': club._id })) {

                    // The user already exists but doesn't currently belong to the club
                    Meteor.call("joinClub", existingUser, club);

                } else {

                    // The user already exists and belongs to this club
                    throw new Meteor.Error("existing-member", "This user is already a member of this club");
                }
            }
        },

        /*
         * Update the current user profile.
         *
         * @param   user - the user to update
         */
        updateUser: function(user) {

            // Check permissions
            if (!Meteor.user() && user._id != Meteor.userId()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply changes on top of original values, to ensure key values are restored
            var originalUser = Meteor.users.findOne(Meteor.userId());
            if (originalUser) {
                user.profile = _.extend(originalUser.profile, user.profile);
            }

            // Apply default values
            var profile = _.extend(user.profile,
                {fullName: user.profile.firstName + " " + user.profile.lastName},
                {name: user.profile.firstName + " " + user.profile.lastName},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

          
            // Check if the user profile is valid
            check(profile, Schema.UserProfile);

            // Update the user
            Meteor.users.update(Meteor.userId(), { $set: { profile: profile }});
        },
        /*
         * Update the current user profile.
         *
         * @param   user - the user to update
         */
        editUser: function(user, modifier, userId) {

            // Apply changes on top of original values, to ensure key values are restored
            var originalUser = Meteor.users.findOne(userId);
            if (originalUser) {
                user.profile = _.extend(originalUser.profile, user.profile);
              }

            // Apply default values
            var profile = _.extend(user.profile,
                {fullName: user.profile.firstName + " " + user.profile.lastName},
                {name: user.profile.firstName + " " + user.profile.lastName},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the user profile is valid
            check(profile, Schema.UserProfile);

            // Update the user
            Meteor.users.update(userId, { $set: { profile: profile }});

        },

        /*
         * Removes a user from a club.
         *
         * @param   user - the user to remove
         */
        removeUser: function(user) {

            var clubId = Meteor.user().profile.currentClubId;

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Remove the selected club from the users profile
            Meteor.users.update(user._id, {$pull: {'profile.memberships': {clubId: clubId}}});

            // Remove the user roles for the selected club
            Roles.setUserRoles(user._id, [], clubId);

            // Fetch the current club
            var club = Club.findOne(clubId);

            // Build the email template
            SSR.compileTemplate("userRemovedEmailTemplate", Assets.getText("email_templates/user_removed.html"));
            Template.userRemovedEmailTemplate.helpers({
                club: function() {
                    return club;
                },
                user: function() {
                    return user;
                },
                link: function() {
                    return "LINK";
                }
            });

            // Send user email
            Meteor.call("sendUserEmail", user.emails[0].address, "You are no longer a member of " + club.name, 
                SSR.render("userRemovedEmailTemplate", { user: user, club: club }));
        },

        /*
         * Update the current users current club.
         *
         * @param   club - the current club to set
         */
        updateUserCurrentClub: function(club) {

            // Check permissions
            if (!Meteor.user()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the user
            Meteor.users.update(Meteor.userId(), { $set: { 'profile.currentClubId' : club._id }});
        },
        /*
         * Create a new user - if not already present.
         *
         * @param   user - the user
         * @param   club - the club to join
         */
         createNewUser: function(email, user, club, memType) {

            var existingUser = Meteor.users.findOne({ 'emails.address': email });
            if (existingUser == null) {
                var userId = Accounts.createUser({'email': email, 'profile': user.profile});
                Meteor.users.update({_id: userId},
                                    {$addToSet: {'profile.memberships':{clubId:club._id, memType:memType, status: "PENDING",endDate:"01/01/1970"}}}); 
                
                
                Accounts.sendEnrollmentEmail(userId);

                // Add the default user role for the selected club
                Roles.addUsersToRoles(userId, ["user"], club._id);

                // Created the user now add the user to the club
                Meteor.call("joinClub", user, club);

            }

         },
        /*
         * Join a club.
         *
         * @param   user - the user
         * @param   club - the club to join
         */
        joinClub: function(user, club) {

            // Check permissions
            if (!Meteor.user()) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Ensure we haven't exceeded our user limit
            var currentUserCount = Meteor.users.find({ 'profile.memberships.clubId': club._id}).count();
            if (currentUserCount >= club.numberOfUsersLimit) {
                throw new Meteor.Error("maximum-users", "You can not add this user as you have hit your user limit");
            } else {

                // Add the selected club to the users profile
                Meteor.users.update(user._id,{ $addToSet: {'profile.memberships':{clubId:club._id}}});  
                
                //if (user.profile.memberships.clubId) {
                //    Meteor.users.update(user._id, { $push: { 'profile.memberships.clubId' : club._id }});
                //} else {
                 //   Meteor.users.update(user._id, { $set: { 'profile.memberships.clubId' : [club._id] }});
                //}
                 
                
                // Build the email template
               SSR.compileTemplate("userAddedEmailTemplate", Assets.getText("email_templates/user_added.html"));
                Template.userAddedEmailTemplate.helpers({
                    club: function() {
                        return club;
                    },
                    user: function() {
                        return user;
                    },
                    link: function() {
                        return "LINK";
                    }
                });

                // Send user email
                Meteor.call("sendUserEmail", user.emails[0].address, "You are now a member of " + club.name, SSR.render("userAddedEmailTemplate", 
                    { user: user, club: club }));
                
            }
        },

        /*
         * Send an email to a user.
         *
         * @param   toRecipient - the email recipient
         * @param   subject - the email subject
         * @param   message - the email message
         */
        sendUserEmail: function(toRecipient, subject, message) {

            // Don't block
            this.unblock();

            // Send email
            new Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN }).send({
                to: toRecipient,
                from: process.env.REPLY_TO,
                subject: subject,
                html: message
            });

            console.log("Subject: " + subject);
            console.log("Message: " + message);
        }

    });
}
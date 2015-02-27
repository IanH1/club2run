Meteor.methods({
    createNewUserFromMember: function(memberId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Fetch the member
        var member = Members.findOne(memberId);

        // Ensure the member doesn't have a user assigned already
        if (!member.userId) {

            // Create a user account for that member
            var userId = Accounts.createUser({
                email: member.email,
                profile: {firstName: member.firstName, lastName: member.lastName, fullName: member.fullName}
            });
            Accounts.sendEnrollmentEmail(userId);

            // Update the member, assigning the new user
            Members.update(memberId, {$set: {userId: userId}});
        }
    }
});
Meteor.methods({
    updateProfile: function(profile) {

        // Check user permissions
        if (!Meteor.user()) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        var fullName = profile.firstName + " " + profile.lastName;
        profile = _.extend(Meteor.user().profile, profile,
            {fullName: fullName}
        );

        // Check if the profile is valid
        check(profile, Schema.UserProfile);

        // Update the user
        Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
    }
});
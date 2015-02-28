Meteor.methods({
    updateProfile: function(profile) {

        // Check user permissions
        if (!Meteor.user()) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        var fullName = profile.firstName + " " + profile.lastName;
        profile = _.extend(Meteor.user().profile, profile,
            {fullName: fullName},
            {name: fullName}
        );

        // Check if the profile is valid
        check(profile, Schema.UserProfile);

        // Update the user
        Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
    },
    sendEmail: function(doc) {

        // Important server-side check for security and data integrity
        //check(doc, Schema.contact);
        this.unblock();

        var options = {
            apiKey: 'key-5a73f6fcbe8f3385087d841c667880a1',
            domain: 'mg.club2run.com'
        }
        var Emailer = new Mailgun(options);
        Emailer.send({
            'to': 'davidmulligan@btopenworld.com',
            'from': 'no-reply@club2run.com',
            'html': '<html><head></head><body>' + doc.message + '</body></html>',
            'text': doc.message,
            'subject': doc.subject,
            'tags': [
                'some',
                'test',
                'tags'
            ]
        });
    }
});
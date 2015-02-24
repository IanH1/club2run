if (Roles.getAllRoles().count() === 0) {
    Roles.createRole('club_admin');
}

if (Meteor.users.find().count() === 0) {
    davidId = Accounts.createUser({
        username: "david",
        email: "davidmulligan@btopenworld.com",
        password: "password",
        profile: { firstName: "David", lastName: "Mulligan", fullName: "David Mulligan" }
    });
    ianId = Accounts.createUser({
        username: "ian",
        email: "ian@ian.com",
        password: "password",
        profile: { fullName: "Ian Humphreys" }
    });
}

if (Clubs.find().count() === 0) {
    clubId = Clubs.insert({
        name: "Sunbury & Walton Hockey Club",
        type: "Hockey",
        associations: ["Surrey Hockey Association"],
        clubColours: ["0", "0", "0"],
        email: "conrad.ray@sky.com",
        websiteUrl: "http://www.swhawks.com",
        telephone: "07740812613",
        address: {
            line1: "The Pavilion",
            line2: "St Pauls Catholic College",
            line3: "The Ridings",
            line4: "Green Street",
            city: "Sunbury-On-Thames",
            county: "Surrey",
            postCode: "TW16 6NX",
            country: "UK",
            longitude: "",
            latitude: ""
        }
    });
    Meteor.users.update({ _id: Meteor.users.findOne({ username: 'david' })._id }, { $set: { 'profile.clubId': clubId, 'emails.0.verified': true}});
    Meteor.users.update({ _id: Meteor.users.findOne({ username: 'ian' })._id }, { $set: { 'profile.clubId': clubId, 'emails.0.verified': true}});
    Roles.addUsersToRoles(davidId, ['club_user', 'club_admin'], Roles.GLOBAL_GROUP);
    Roles.addUsersToRoles(ianId, ['club_user', 'club_admin'], Roles.GLOBAL_GROUP);
}
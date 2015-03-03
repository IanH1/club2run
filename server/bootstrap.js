// Roles
if (Roles.getAllRoles().count() === 0) {
    Roles.createRole("superuser");
    Roles.createRole("admin");
    Roles.createRole("player");
    Roles.createRole("member");
}

// Super Users
if (Meteor.users.find().count() === 0) {
    davidId = Accounts.createUser({
        email: "davidmulligan@btopenworld.com",
        password: "password",
        profile: { firstName: "David", lastName: "Mulligan", fullName: "David Mulligan", name: "David Mulligan" }
    });
    ianId = Accounts.createUser({
        email: "ian@club2run.com",
        password: "password",
        profile: { firstName: "Ian", lastName: "Humphreys", fullName: "Ian Humphreys", name: "Ian Humphreys" }
    });
    testId = Accounts.createUser({
        email: "test@test.com",
        password: "password",
        profile: { firstName: "Test", lastName: "Test", fullName: "Test Test", name: "Test Test" }
    });
    Meteor.users.update({ _id: davidId }, { $set: { 'emails.0.verified': true }});
    Meteor.users.update({ _id: ianId }, { $set: { 'emails.0.verified': true }});
    Meteor.users.update({ _id: testId }, { $set: { 'emails.0.verified': true }});
    Roles.addUsersToRoles(davidId, ["superuser"], Roles.GLOBAL_GROUP);
    Roles.addUsersToRoles(ianId, ["superuser"], Roles.GLOBAL_GROUP);
}

// Setup a test club (will be deleted)
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
            line1: "The Pavilion, St Pauls Catholic College",
            line2: "The Ridings, Green Street",
            city: "Sunbury-On-Thames",
            county: "Surrey",
            postCode: "TW16 6NX",
            country: "UK",
            longitude: "",
            latitude: ""
        }
    });
    Meteor.users.update({ _id: davidId }, { $set: { 'profile.clubId': clubId }});
    Meteor.users.update({ _id: ianId }, { $set: { 'profile.clubId': clubId }});
    Meteor.users.update({ _id: testId }, { $set: { 'profile.clubId': clubId }});
    Roles.addUsersToRoles(davidId, ["admin", "player", "member"], clubId);
    Roles.addUsersToRoles(ianId, ["admin", "player", "member"], clubId);
    Roles.addUsersToRoles(testId, ["member"], clubId);
}
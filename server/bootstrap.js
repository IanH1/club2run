// Roles
if (Roles.getAllRoles().count() === 0) {
    Roles.createRole("superuser");
    Roles.createRole("admin");
    Roles.createRole("team_manager");
    Roles.createRole("player");
    Roles.createRole("user");
}

// Club Type
if (ClubType.find().count() === 0) {
    ClubType.insert({ name: "Football", numberOfPlayers: 11, numberOfSubstitutes: 3, positions: ["Goalkeeper", "Defender", "Midfielder", "Forward"] });
    ClubType.insert({ name: "Rugby Union", numberOfPlayers: 15, numberOfSubstitutes: 3, positions: ["Loose-Head Prop", "Hooker", "Tight-Head Prop", "Second Row", "Blind-Side Flanker", "Open-Side Flanker", "Number 8", "Scrum Half", "Fly-Half", "Left Wing", "Inside Centre", "Outside Centre", "Right Wing", "Full-Back"] });
    ClubType.insert({ name: "Hockey", numberOfPlayers: 10, numberOfSubstitutes: 3, positions: ["Position1", "Position2", "Position3", "Position4"] });
}

// Super Users
if (Meteor.users.find().count() === 0) {
    davidId = Accounts.createUser({
        email: "davidmulligan@btopenworld.com",
        password: "password",
        profile: { firstName: "David", lastName: "Mulligan", fullName: "David Mulligan", name: "David Mulligan" }
    });
    Roles.addUsersToRoles(davidId, ["superuser"], Roles.GLOBAL_GROUP);
    Meteor.users.update({ _id: davidId }, { $set: { 'emails.0.verified': true }});

    ianId = Accounts.createUser({
        email: "ian@club2run.com",
        password: "password",
        profile: { firstName: "Ian", lastName: "Humphreys", fullName: "Ian Humphreys", name: "Ian Humphreys" }
    });
    Roles.addUsersToRoles(ianId, ["superuser"], Roles.GLOBAL_GROUP);
    Meteor.users.update({ _id: ianId }, { $set: { 'emails.0.verified': true }});
}

// Setup a test club
if (Club.find().count() === 0) {
    type = ClubType.findOne({ name: "Hockey" });
    clubId = Club.insert({
        name: "Sunbury & Walton Hockey Club",
        type: type,
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
    Roles.addUsersToRoles(davidId, ["admin", "player", "user"], clubId);
    Meteor.users.update({ _id: ianId }, { $set: { 'profile.clubId': clubId }});
    Roles.addUsersToRoles(ianId, ["admin", "player", "user"], clubId);

    var user1 = Accounts.createUser({
        email: "user1@test.com",
        password: "password",
        profile: {firstName: "User", lastName: "One", fullName: "User One", name: "User One"}
    });
    Meteor.users.update({_id: user1}, {$set: {'emails.0.verified': true, 'profile.clubId': clubId }});
    Roles.addUsersToRoles(user1, ["player", "user"], clubId);

    var user2 = Accounts.createUser({
        email: "user2@test.com",
        password: "password",
        profile: {firstName: "User", lastName: "Two", fullName: "User Two", name: "User Two"}
    });
    Meteor.users.update({_id: user2}, {$set: {'emails.0.verified': true, 'profile.clubId': clubId }});
    Roles.addUsersToRoles(user2, ["player", "user"], clubId);

    var user3 = Accounts.createUser({
        email: "user3@test.com",
        password: "password",
        profile: {firstName: "User", lastName: "Three", fullName: "User Three", name: "User Three"}
    });
    Meteor.users.update({_id: user3}, {$set: {'emails.0.verified': true, 'profile.clubId': clubId }});
    Roles.addUsersToRoles(user3, ["player", "user"], clubId);

    var user4 = Accounts.createUser({
        email: "user4@test.com",
        password: "password",
        profile: {firstName: "User", lastName: "Four", fullName: "User Four", name: "User Four"}
    });
    Meteor.users.update({_id: user4}, {$set: {'emails.0.verified': true, 'profile.clubId': clubId }});
    Roles.addUsersToRoles(user4, ["player", "user"], clubId);

    var user5 = Accounts.createUser({
        email: "user5@test.com",
        password: "password",
        profile: {firstName: "User", lastName: "Five", fullName: "User Five", name: "User Five"}
    });
    Meteor.users.update({_id: user5}, {$set: {'emails.0.verified': true, 'profile.clubId': clubId }});
    Roles.addUsersToRoles(user5, ["player", "user"], clubId);
}
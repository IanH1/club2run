// Roles
if (Roles.getAllRoles().count() === 0) {
    Roles.createRole("superuser");
    Roles.createRole("admin");
    Roles.createRole("editor");
    Roles.createRole("manager");
    Roles.createRole("player");
    Roles.createRole("user");
}

// Club Type
if (ClubType.find().count() === 0) {
    ClubType.insert({ name: "Football", numberOfPlayers: 15, positions: ["Goalkeeper", "Defender", "Midfielder", "Forward"] });
    ClubType.insert({ name: "Rugby Union", numberOfPlayers: 18, positions: ["Loose-Head Prop", "Hooker", "Tight-Head Prop", "Second Row", "Blind-Side Flanker", "Open-Side Flanker", "Number 8", "Scrum Half", "Fly-Half", "Left Wing", "Inside Centre", "Outside Centre", "Right Wing", "Full-Back"] });
    ClubType.insert({ name: "Hockey", numberOfPlayers: 10, positions: ["Position1", "Position2", "Position3", "Position4"] });
}

// Super Users
if (Meteor.users.find().count() === 0) {
    davidId = Accounts.createUser({ email: "davidmulligan@btopenworld.com", password: "password", profile: { firstName: "David", lastName: "Mulligan", fullName: "David Mulligan", name: "David Mulligan" }});
    ianId = Accounts.createUser({ email: "ian@club2run.com", password: "password", profile: { firstName: "Ian", lastName: "Humphreys", fullName: "Ian Humphreys", name: "Ian Humphreys" }});

    Roles.addUsersToRoles(davidId, ["superuser"], Roles.GLOBAL_GROUP);
    Roles.addUsersToRoles(ianId, ["superuser"], Roles.GLOBAL_GROUP);

    Meteor.users.update({ _id: davidId }, { $set: { 'emails.0.verified': true }});
    Meteor.users.update({ _id: ianId }, { $set: { 'emails.0.verified': true }});
}

// Setup test clubs
if (Club.find().count() === 0) {

    // Setup a general list of test clubs
    type = ClubType.findOne({ name: "Rugby Union" });

    for (var i = 0; i < 10; i++) {
        var clubId = Club.insert({ name: "Club" + i, type: type });
        Meteor.users.update({ _id: davidId }, { $push: { 'profile.clubIds': clubId }});
        Meteor.users.update({ _id: ianId }, { $push: { 'profile.clubIds': clubId }});
    }

    // Create a complete test club
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
        },
        numberOfUsersLimit: 10,
        opponents: []
    });

    // Create a list of test opponenets
    for (var i = 0; i < 10; i++) {
        Club.update({ _id: clubId }, { $push: { opponents: Team.insert({ name: "Team" + i }, clubId) }});
    }

    Meteor.users.update({ _id: davidId }, { $push: { 'profile.clubIds': clubId }});
    Meteor.users.update({ _id: ianId }, { $push: { 'profile.clubIds': clubId }});

    Roles.addUsersToRoles(davidId, ["admin", "user"], clubId);
    Roles.addUsersToRoles(ianId, ["admin", "user"], clubId);

    // Setup a general list of test users
    for (var i = 0; i < 10; i++) {
        var user = Accounts.createUser({ email: "user" + i + "@test.com", password: "password", profile: { firstName: "User", lastName: "User" + i, fullName: "User User" + i, name: "User User" + i }});
        Meteor.users.update({_id: user}, { $set: {'emails.0.verified': true, 'profile.clubId': [clubId] }});
        Roles.addUsersToRoles(user, ["user"], clubId);
    }
}
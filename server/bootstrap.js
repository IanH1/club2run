var now = new Date();

if (Clubs.find().count() === 0) {

    Clubs.insert({
        name: "Sunbury & Walton Hockey Club",
        type: "Hockey",
        associations: ["Surrey Hockey Association"],
        colours: ["0", "0", "0"],
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
}

if (Teams.find().count() === 0) {

    Teams.insert({
        name: "Sunbury and Walton Girls A Squad",
        ageRange: "Under 16",
        sex: "F",
        manager: davidId,
        coaches: [ianId],
        clubId: Clubs.findOne()._id
    });
}

if (Members.find().count() === 0) {

    Members.insert({
        firstName: "Selin",
        lastName: "Humphreys",
        sex: "F",
        dateOfBirth: now,
        email: "selin.humphreys1@gmail.com",
        telephone1: "07576040021",
        telephone2: "02082881645",
        telephoneEmergency: "02071023326",
        address: {
            line1: "13 Cole Park Gardens",
            line2: "",
            city: "Twickenham",
            county: "Middlesex",
            postCode: "TW1 1JB",
            country: "UK",
            longitude: "",
            latitude: ""
        },
        ethinicity: "White/British",
        disabilities: ["None"],
        allergies: ["None"],
        otherComments: ""
    });

    Members.insert({
        firstName: "Eren",
        lastName: "Humphreys",
        sex: "F",
        dateOfBirth: now,
        email: "erenhumphreys8@gmail.com",
        telephone1: "07576040020",
        telephone2: "02082881645",
        telephoneEmergency: "02071023326",
        address: {
            line1: "13 Cole Park Gardens",
            line2: "",
            city: "Twickenham",
            county: "Middlesex",
            postCode: "TW1 1JB",
            country: "UK",
            longitude: "",
            latitude: ""
        },
        ethinicity: "White/British",
        disabilities: ["None"],
        allergies: ["None"],
        otherComments: ""
    });
}

if (Officals.find().count() === 0) {

    Officals.insert({
        firstName: "Peter",
        lastName: "English",
        role: "Umpire",
        clubId: Clubs.findOne()._id
    });
}

if (Staff.find().count() === 0) {

    Staff.insert({
        firstName: "Martin",
        lastName: "Buchanan",
        role: "Coach",
        clubId: Clubs.findOne()._id
    });

    Staff.insert({
        firstName: "Danny",
        lastName: "Blacker",
        role: "Coach",
        clubId: Clubs.findOne()._id
    });
}

if (Events.find().count() === 0) {

    Events.insert({
        type: "Match",
        competition: "Friendly",
        meetupTime: now,
        startTime: now,
        location: {
            line1: "St Pauls Pitch, St Pauls Catholic College",
            line2: "The Ridings, Green Street",
            city: "Sunbury-On-Thames",
            county: "Surrey",
            postCode: "TW16 6NX",
            country: "UK",
            longitude: "",
            latitude: ""
        },
        teamSize: 11,
        homeCoaches: [ianId],
        awayCoaches: ["Dan Brown"],
        officals: [Officals.findOne()._id],
        team: Teams.findOne()._id,
        opponent: "Essex Hockey Club",
        status: "On"
    });
}

if (Meteor.users.find().count() === 0) {

    Accounts.onCreateUser(function(options, user) {
        if (!options.profile) {
            options.profile = {}
        }
        if (options.profile) {
            user.profile = options.profile;
        }
        user.clubId = Clubs.findOne()._id;
        return user;
    });

    var davidId = Accounts.createUser({
        username: "david",
        email: "davidmulligan@btopenworld.com",
        password: "password"
    });

    var ianId = Accounts.createUser({
        username: "ian",
        email: "ian@ian.com",
        password: "password"
    });
}
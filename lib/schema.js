Schema = {};

Schema.AddressSchema = new SimpleSchema({
    line1: {
        type: String,
        label: "Line 1",
        max: 100,
        optional: true
    },
    line2: {
        type: String,
        label: "Line 2",
        max: 100,
        optional: true
    },
    city: {
        type: String,
        label: "City",
        max: 100,
        optional: true
    },
    county: {
        type: String,
        label: "County",
        max: 100,
        optional: true
    },
    postCode: {
        type: String,
        label: "Postcode",
        max: 100,
        optional: true
    },
    country: {
        type: String,
        label: "Country",
        max: 100,
        optional: true
    }
});

Schema.ClubTypeSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 20
    },
    numberOfPlayers: {
        type: Number,
        label: "Number of Players",
        optional: true
    },
    numberOfSubstitutes: {
        type: Number,
        label: "Number of Substitutes",
        optional: true
    },
    positions: {
        type: [String],
        label: "Positions",
        max: 50,
        optional: true
    }
});
ClubType.attachSchema(Schema.ClubTypeSchema);

Schema.ClubSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    type: {
        type: Schema.ClubTypeSchema,
        label: "Type"
    },
    associations: {
        type: [String],
        label: "Associations",
        max: 100,
        optional: true
    },
    teamColours: {
        type: [String],
        label: "Team Colours",
        max: 20,
        optional: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email",
        max: 150,
        optional: true
    },
    websiteUrl: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: "Website Url",
        max: 100,
        optional: true
    },
    telephone1: {
        type: String,
        label: "Telephone 1",
        max: 20,
        optional: true
    },
    telephone2: {
        type: String,
        label: "Telephone 2",
        max: 20,
        optional: true
    },
    address: {
        type: Schema.AddressSchema,
        label: "Address",
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Clubs.attachSchema(Schema.ClubSchema);














Schema.MatchSchema = new SimpleSchema({
    teamId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Team"
    },
    opponent: {
        type: String,
        label: "Opponents",
        max: 100
    },
    opponentCoaches: {
        type: [String],
        label: "Away Coaches",
        max: 100,
        optional: true
    },
    competition: {
        type: String,
        label: "Competition",
        max: 100,
        optional: true
    },
    meetupDateTime: {
        type: Date,
        label: "Meetup Date/Time",
        optional: true
    },
    officials: {
        type: Array,
        label: "Officials",
        optional: true
    },
    "officials.$": {
        type: SimpleSchema.RegEx.Id
    }
});
Schema.MeetingSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 100
    },
    details: {
        type: String,
        label: "Details",
        optional: true
    },
    invitees: {
        label: "Invitee(s)",
        type: Array,
        optional: true
    },
    'invitees.$': {
        type: Object
    },
    'invitees.$.memberId': {
        type: SimpleSchema.RegEx.Id
    },
    'invitees.$.status': {
        type: String,
        allowedValues: ["Accepted", "Tentative", "Declined"],
        optional: true
    }
});
Schema.EventSchema = new SimpleSchema({
    type: {
        type: String,
        label: 'Type',
        max: 10,
        allowedValues: ["Match", "Training", "Meeting"]
    },
    description: {
        type: String,
        label: "Description",
        max: 100,
        optional: true
    },
    startDateTime: {
        type: Date,
        label: "Start Date/Time"
    },
    endDateTime: {
        type: Date,
        label: "End Date/Time",
        optional: true
    },
    allDay: {
        type: Boolean,
        label: "All Day",
        optional: true
    },
    address: {
        type: Schema.AddressSchema,
        label: "Location",
        optional: true
    },
    match: {
        type: Schema.MatchSchema,
        optional: true
    },
    training: {
        type: Schema.EventTrainingSchema,
        optional: true
    },
    meeting: {
        type: Schema.MeetingSchema,
        optional: true
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Events.attachSchema(Schema.EventSchema);

Schema.TeamSelectionSchema = new SimpleSchema({
    matchId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    published: {
        type: Boolean,
        label: "Type",
        optional: true
    },
    players: {
        label: "Player(s)",
        type: Array,
        optional: true
    },
    'players.$': {
        type: Object
    },
    'players.$.playerId': {
        type: SimpleSchema.RegEx.Id
    },
    'players.$.position': {
        type: String,
        optional: true
    },
    'players.$.selected': {
        type: Boolean,
        optional: true
    },
    'players.$.availability': {
        type: String,
        allowedValues: ["Available", "Unavailable"],
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
TeamSelections.attachSchema(Schema.TeamSelectionSchema);



Schema.MatchNotificationSchema = new SimpleSchema({
    memberId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    matchId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});
Schema.MeetingNotificationSchema = new SimpleSchema({
    memberId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    meetingId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});
Schema.NotificationSchema = new SimpleSchema({
    type: {
        type: String,
        label: 'Type'
    },
    link: {
        type: String,
        optional: true
    },
    linkId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    meeting: {
        type: Schema.MeetingNotificationSchema,
        optional: true
    },
    match: {
        type: Schema.MatchNotificationSchema,
        optional: true
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Notifications.attachSchema(Schema.NotificationSchema);







Schema.ContactSchema = new SimpleSchema({
    email: {
        type: String,
        label: "Email",
        max: 100
    },
    subject: {
        type: String,
        label: "Subject",
        max: 100
    },
    message: {
        type: String,
        label: "Message",
        max: 1000
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        label: 'First Name',
        max: 100,
        optional: true
    },
    lastName: {
        type: String,
        label: 'Last Name',
        max: 100,
        optional: true
    },
    fullName: {
        type: String,
        label: 'Full Name',
        optional: true
    },
    name: {
        type: String,
        label: 'Name',
        optional: true
    },
    picture: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'ProfilePictures'
            }
        },
        label: 'Choose Avatar',
        optional: true
    },
    gender: {
        type: String,
        label: 'Gender',
        max: 10,
        allowedValues: ["Male","Female"],
        optional: true
    },
    homeTelephone: {
        type: String,
        label: "Home Telephone",
        max: 20,
        optional: true
    },
    mobileTelephone: {
        type: String,
        label: "Mobile Telephone",
        max: 20,
        optional: true
    },
    address: {
        type: Schema.AddressSchema,
        label: "Address",
        optional: true
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        optional: true
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    "roles": {
        type: Object,
        blackbox: true,
        optional: true
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    status: {
        type: Object,
        optional: true,
        blackbox: true
    }
});
Meteor.users.attachSchema(Schema.User);



Schema.EventTrainingSchema = new SimpleSchema({
    team: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Team"
    }
});

Schema.MemberSchema = new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 100
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 100
    },
    fullName: {
        type: String,
        optional: true
    },
    gender: {
        type: String,
        label: "Gender",
        max: 10,
        allowedValues: ["Male","Female"],
        optional: true
    },
    dateOfBirth: {
        type: Date,
        label: "Date of Birth",
        optional: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email",
        max: 150
    },
    homeTelephone: {
        type: String,
        label: "Home Telephone",
        max: 20,
        optional: true
    },
    mobileTelephone: {
        type: String,
        label: "Mobile Telephone",
        max: 20,
        optional: true
    },
    emergencyContactName: {
        type: String,
        label: "Emergency Contact",
        max: 100,
        optional: true
    },
    emergencyContactTelephone: {
        type: String,
        label: "Emergency Contact Telephone",
        max: 20,
        optional: true
    },
    address: {
        type: Schema.AddressSchema,
        label: "Address",
        optional: true
    },
    ethinicity: {
        type: String,
        label: "Ethinicity",
        max: 20,
        allowedValues: ["White", "Black"],
        optional: true
    },
    disabilities: {
        type: String,
        label: "Disabilities",
        max: 100,
        optional: true
    },
    allergies: {
        type: String,
        label: "Allergies",
        max: 100,
        optional: true
    },
    otherComments: {
        type: String,
        label: "Other Comments",
        max: 200,
        optional: true
    },
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Members.attachSchema(Schema.MemberSchema);

Schema.MessageSchema = new SimpleSchema({
    message: {
        type: String,
        label: "Message"
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Messages.attachSchema(Schema.MessageSchema);

Schema.OfficialSchema = new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 100
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 100
    },
    fullName: {
        type: String,
        optional: true
    },
    gender: {
        type: String,
        label: "Gender",
        max: 10,
        allowedValues: ["Male","Female"]
    },
    role: {
        type: String,
        label: "Role",
        max: 50,
        allowedValues: ["Umpire"]
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Officials.attachSchema(Schema.OfficialSchema);

Schema.StaffSchema = new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 100
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 100
    },
    fullName: {
        type: String,
        optional: true
    },
    gender: {
        type: String,
        label: "Gender",
        max: 10,
        allowedValues: ["Male","Female"]
    },
    role: {
        type: String,
        label: "Role",
        max: 50,
        optional: true,
        allowedValues: ["Coach", "Team Manager"]
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Staff.attachSchema(Schema.StaffSchema);

Schema.TaskSchema = new SimpleSchema({
    text: {
        type: String,
        label: "Text",
        max: 100
    },
    complete: {
        type: Boolean,
        label: "Complete"
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Tasks.attachSchema(Schema.TaskSchema);

Schema.TeamSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    ageRange: {
        type: String,
        label: "Age Range",
        max: 20,
        allowedValues: ["Under 5", "Under 10", "Under 16", "Under 17", "Adult"]
    },
    gender: {
        type: String,
        label: "Gender",
        max: 10,
        allowedValues: ["Male","Female"]
    },
    coaches: {
        type: Array,
        label: "Coaches",
        optional: true
    },
    "coaches.$": {
        type: SimpleSchema.RegEx.Id
    },
    players: {
        type: Array,
        label: "Players",
        optional: true
    },
    "players.$": {
        type: SimpleSchema.RegEx.Id
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Teams.attachSchema(Schema.TeamSchema);

Schema.ArticleSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Headline",
        max: 200
    },
    content: {
        type: String,
        label: "News",
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor',
                height: 200   //set editable area's height
            }
        }
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdOn: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    modifiedOn: {
        type: Date,
        optional: true
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});
Articles.attachSchema(Schema.ArticleSchema);
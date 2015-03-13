Schema = {};

Schema.Address = new SimpleSchema({
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

Schema.EmailMessage = new SimpleSchema({
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

Schema.Article = new SimpleSchema({
    headline: {
        type: String,
        label: "Headline",
        max: 200
    },
    content: {
        type: String,
        label: "News",
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
Article.attachSchema(Schema.Article);

Schema.ClubType = new SimpleSchema({
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
ClubType.attachSchema(Schema.ClubType);

Schema.Club = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    type: {
        type: Schema.ClubType,
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
        type: Schema.Address,
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
Club.attachSchema(Schema.Club);

Schema.Fixture = new SimpleSchema({
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
        label: "Opponent Coaches",
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
    startDateTime: {
        type: Date,
        label: "Start Date/Time"
    },
    endDateTime: {
        type: Date,
        label: "End Date/Time",
        optional: true
    },
    officialIds: {
        type: Array,
        label: "Officials",
        optional: true
    },
    "officialIds.$": {
        type: SimpleSchema.RegEx.Id
    },
    address: {
        type: Schema.Address,
        label: "Address",
        optional: true
    },
    additionalInformation: {
        type: String,
        label: "Additional Information",
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
Fixture.attachSchema(Schema.Fixture);

Schema.Meeting = new SimpleSchema({
    subject: {
        type: String,
        label: "Subject",
        max: 100
    },
    details: {
        type: String,
        label: "Details",
        optional: true
    },
    startDateTime: {
        type: Date,
        label: "Start Date/Time"
    },
    endDateTime: {
        type: Date,
        label: "End Date/Time"
    },
    allDay: {
        type: Boolean,
        label: "All Day",
        optional: true
    },
    attendeeIds: {
        label: "Attendees",
        type: Array,
        optional: true
    },
    'attendeeIds.$': {
        type: Object
    },
    'attendeeIds.$.userId': {
        type: SimpleSchema.RegEx.Id,
        label: "User"
    },
    'attendeeIds.$.availability': {
        type: String,
        label: "Availability",
        allowedValues: ["Accepted", "Tentative", "Declined"],
        optional: true
    },
    address: {
        type: Schema.Address,
        label: "Address",
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
Meeting.attachSchema(Schema.Meeting);

Schema.Official = new SimpleSchema({
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
        type: Schema.Address,
        label: "Address",
        optional: true
    },
    role: {
        type: String,
        label: "Role",
        max: 50,
        allowedValues: ["Umpire"],
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
Official.attachSchema(Schema.Official);

Schema.Staff = new SimpleSchema({
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
        type: Schema.Address,
        label: "Address",
        optional: true
    },
    role: {
        type: String,
        label: "Role",
        max: 50,
        allowedValues: ["Coach", "Team Manager"],
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
Staff.attachSchema(Schema.Staff);

Schema.Team = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    code: {
        type: String,
        label: "Code",
        max: 10,
        optional: true
    },
    ageRange: {
        type: String,
        label: "Age Range",
        max: 20,
        allowedValues: ["Under 5", "Under 10", "Under 16", "Under 17", "Adult"],
        optional: true
    },
    gender: {
        type: String,
        label: "Gender",
        max: 10,
        allowedValues: ["Male","Female"],
        optional: true
    },
    managerId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    coachIds: {
        type: Array,
        label: "Coaches",
        optional: true
    },
    "coachIds.$": {
        type: SimpleSchema.RegEx.Id
    },
    squad: {
        type: Array,
        label: "Squad",
        optional: true
    },
    "squad.$": {
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
Team.attachSchema(Schema.Team);

Schema.TeamSelection = new SimpleSchema({
    fixtureId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    teamId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    published: {
        type: Boolean,
        label: "Type",
        optional: true
    },
    squad: {
        label: "Player(s)",
        type: Array,
        optional: true
    },
    'squad.$': {
        type: Object
    },
    'squad.$.squadNumber': {
        type: Number
    },
    'squad.$.userId': {
        type: SimpleSchema.RegEx.Id,
        optional: true
    },
    'squad.$.position': {
        type: String,
        optional: true
    },
    'squad.$.availability': {
        type: String,
        allowedValues: ["Available", "Tentative", "Unavailable"],
        optional: true
    },
    'squad.$.notification': {
        type: String,
        allowedValues: ["Email", "SMS"],
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
TeamSelection.attachSchema(Schema.TeamSelection);

Schema.Training = new SimpleSchema({
    teamId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Team"
    },
    startDateTime: {
        type: Date,
        label: "Start Date/Time"
    },
    endDateTime: {
        type: Date,
        label: "End Date/Time"
    },
    coachIds: {
        type: Array,
        label: "Coaches",
        optional: true
    },
    "coachIds.$": {
        type: SimpleSchema.RegEx.Id
    },
    address: {
        type: Schema.Address,
        label: "Address",
        optional: true
    },
    additionalInformation: {
        type: String,
        label: "Additional Information",
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
Training.attachSchema(Schema.Training);

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        label: 'First Name',
        max: 100
    },
    lastName: {
        type: String,
        label: 'Last Name',
        max: 100
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
    gender: {
        type: String,
        label: 'Gender',
        max: 10,
        allowedValues: ["Male","Female"],
        optional: true
    },
    dateOfBirth: {
        type: Date,
        label: 'Date of Birth',
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
        type: Schema.Address,
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
    picture: {
        type: String,
        label: 'Choose Avatar',
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
        type: Date,
        optional: true
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











Schema.FixtureNotification = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fixtureId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});
Schema.MeetingNotification = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    meetingId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});
Schema.Notification = new SimpleSchema({
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
        type: Schema.MeetingNotification,
        optional: true
    },
    fixture: {
        type: Schema.FixtureNotification,
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
Notifications.attachSchema(Schema.Notification);

Schema.Message = new SimpleSchema({
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
Messages.attachSchema(Schema.Message);

Schema.Task = new SimpleSchema({
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
Tasks.attachSchema(Schema.Task);
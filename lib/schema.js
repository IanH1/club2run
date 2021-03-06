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

Schema.Article = new SimpleSchema({
    headline: {
        type: String,
        label: "Headline",
        max: 200,
        optional: true
    },
    content: {
        type: String,
        label: "Content",
        optional: true
    },
    type: {
        type: String,
        allowedValues: ["MATCH_REPORT"],
        max: 20,
        optional: true
    },
    calendarEventId: {
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
        label: "Type",
        optional: true
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
    numberOfUsersLimit: {
        type: Number,
        label: "Maximum Members Limit",
        optional: true
    },
    opponents: {
        type: Array,
        label: "Opponents",
        optional: true
    },
    'opponents.$': {
        type: SimpleSchema.RegEx.Id
    },
    member:{
        type: Array,
        optional: true
    },
    'member.$': {
        type: Object
    },
    'member.$.type': {
        type: String,
        optional: true
    },
    'member.$.fee': {
        type: Number,
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
    homeTeamId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Home Team"
    },
    awayTeamId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Away Team"
    },
    homeScore: {
        type: Number,
        label: "Home Score",
        optional: true
    },
    awayScore: {
        type: Number,
        label: "Away Score",
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
    location: {
        type: Schema.Address,
        label: "Location",
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
    squad: {
        label: "Squad",
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
    'squad.$.availabilityComment': {
        type: String,
        max: 100,
        optional: true
    },
    messageBoardId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});

Schema.Attendee = new SimpleSchema({
    userId: {
        type: SimpleSchema.RegEx.Id,
        label: "User"
    },
    availability: {
        type: String,
        label: "Availability",
        allowedValues: ["Accepted", "Tentative", "Declined"],
        optional: true
    },
    availabilityComment: {
        type: String,
        label: "Comment",
        max: 100,
        optional: true
    }
});

Schema.Meeting = new SimpleSchema({
    attendeeIds: {
        label: "Attendees",
        type: Array,
        optional: true
    },
    'attendeeIds.$': {
        type: Schema.Attendee
    }
});

Schema.MessageBoard = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    'messages.$': {
        type: Object
    },
    'messages.$.message': {
        type: String
    },
    'messages.$.createdOn': {
        type: Date,
        optional: true
    },
    'messages.$.createdBy': {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    eventId: {
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
MessageBoard.attachSchema(Schema.MessageBoard);

Schema.Notification = new SimpleSchema({
    description: {
        type: String,
        max: 100
    },
    eventId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
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
    }
});
Notification.attachSchema(Schema.Notification);

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
        allowedValues: ["Male","Female","Mixed"],
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
        allowedValues: ["Under 7","Under 8","Under 9", "Under 10", "Under 11", "Under 12", "Under 13","Under 14","Under 15","Under 16","Under 17","Adult","Veterans","Social"],
        optional: true
    },
    gender: {
        type: String,
        label: "Gender",
        max: 10,
        allowedValues: ["Male", "Female","Mixed"],
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
    'coachIds.$': {
        type: SimpleSchema.RegEx.Id
    },
    players: {
        type: Array,
        label: "Squad",
        optional: true
    },
    'players.$': {
        type: Object
    },
    'players.$.squadNumber': {
        type: Number
    },
    'players.$.position': {
        type: String,
        optional: true
    },
    'players.$.userId': {
        type: SimpleSchema.RegEx.Id,
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
Team.attachSchema(Schema.Team);

Schema.Training = new SimpleSchema({
    teamId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Team"
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
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 100,
        optional: true
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 100,
        optional: true
    },
    fullName: {
        type: String,
        label: "Full Name",
        optional: true
    },
    name: {
        type: String,
        label: "Name",
        optional: true
    },
    gender: {
        type: String,
        label: "Gender",
        max: 10,
        allowedValues: ["Male", "Female", "Mixed"],
        optional: true
    },
    dateOfBirth: {
        type: Date,
        label: "Date of Birth",
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
    parentEmail1: {
        type: String,
        label: "Parent Email 1 (if Junior Member)",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    parentEmail2: {
        type: String,
        label: "Parent Email 2 (if Junior Member)",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    preferredContactMethod: {
        type: String,
        label: "Preferred Contact Method",
        max: 50,
        allowedValues: ["Email", "SMS", "Facebook Messenger", "Google+"],
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
        label: "Choose Avatar",
        optional: true
    },
    currentClubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    memberships: {
        type: Array,
        optional: true
    },
    "memberships.$": {
        type: Object
    },
    "memberships.$.clubId": {
        type: SimpleSchema.RegEx.Id,
        optional: true,
    },
    "memberships.$.memType": {
        type: String,
        label: "Membership Type",
        optional: true
    },
    "memberships.$.status": {
        type: String,
        label: "Status",
        allowedValues: ["ACTIVE", "INACTIVE", "PENDING"],
        optional: true
    },
    "memberships.$.endDate": {
        type: Date,
        label: "Membership End Date",
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

Schema.CalendarEvent = new SimpleSchema({
    type: {
        type: String,
        allowedValues: ["club", "fixture", "meeting", "training"],
        optional: true
    },
    title: {
        type: String,
        label: "Title",
        optional: true
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
    fixture: {
        type: Schema.Fixture,
        optional: true
    },
    meeting: {
        type: Schema.Meeting,
        optional: true
    },
    training: {
        type: Schema.Training,
        optional: true
    },
    reportId: {
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
CalendarEvent.attachSchema(Schema.CalendarEvent);
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
    line3: {
        type: String,
        label: "Line3",
        max: 100,
        optional: true
    },
    line4: {
        type: String,
        label: "Line 4",
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
    },
    location: {
        type: String,
        label: "Location",
        optional: true
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
        optional: true,
        autoValue: function () {
            var firstName = this.field("profile.firstName").value != null ? this.field("profile.firstName").value : "";
            var lastName = this.field("profile.lastName").value != null ? this.field("profile.lastName").value : "";
            return firstName + " " + lastName;
        }
    },
    gender: {
        type: String,
        label: 'Gender',
        allowedValues: ["M","F"],
        optional: true
    },
    avatar: {
        type: String,
        label: 'Avatar',
        max: 100,
        optional: true
    },
    bio: {
        type: String,
        label: 'Bio',
        max: 200,
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
        regEx: /^[a-z0-9A-Z_]{3,15}$/
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
    status: {
        type: Object,
        optional: true,
        blackbox: true
    }
});
Meteor.users.attachSchema(Schema.User);

Schema.ClubSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    type: {
        type: String,
        label: "Type",
        allowedValues: ["Football", "Hockey", "Rugby Union"]
    },
    associations: {
        type: [String],
        label: "Associations",
        max: 100,
        optional: true
    },
    teamColours: {
        type: [String],
        label: "Colour",
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
    memberCount: {
        type: Number
    },
    teamCount: {
        type: Number
    },
    matchCount: {
        type: Number
    },
    officialCount: {
        type: Number
    },
    staffCount: {
        type: Number
    },
    createdOn: {
        type: Date,
        label: "Created Date",
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    modifiedOn: {
        type: Date,
        label: "Modified Date",
        autoValue: function () {
            return new Date;
        }
    }
});
Clubs.attachSchema(Schema.ClubSchema);

Schema.MatchSchema = new SimpleSchema({
    team: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Team",
        autoform: {
            options: function () {
                var options = [];
                Teams.find({}, {sort: {name: 1}}).forEach(function(element) {
                    options.push({
                        label: element.name, value: element._id
                    })
                });
                return options;
            }
        }
    },
    opponent: {
        type: String,
        label: "Opponents",
        max: 100,
        optional: true
    },
    competition: {
        type: String,
        label: "Competition",
        max: 100,
        optional: true
    },
    opponentCoaches: {
        type: [String],
        label: "Away Coaches",
        max: 100,
        optional: true
    },
    startDateTime: {
        type: Date,
        label: "Start Time"
    },
    meetupDateTime: {
        type: Date,
        label: "Meetup Time",
        optional: true
    },
    location: {
        type: Schema.AddressSchema,
        label: "Location",
        max: 100,
        optional: true
    },
    officials: {
        type: Array,
        label: "Officials",
        optional: true,
        autoform: {
            options: function () {
                var options = [];
                Officials.find({}, {sort: {fullName: 1}}).forEach(function (element) {
                    options.push({
                        label: element.fullName, value: element._id
                    })
                });
                return options;
            }
        }
    },
    "officials.$": {
        type: SimpleSchema.RegEx.Id
    },
    otherComments: {
        type: String,
        label: "Other Comments",
        max: 200,
        optional: true
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.user().profile.clubId
            }
        }
    },
    createdOn: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    modifiedOn: {
        type: Date,
        autoValue: function () {
            return new Date;
        }
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            return Meteor.userId();
        }
    }
});
Matches.attachSchema(Schema.MatchSchema);

Schema.MemberSchema = new SimpleSchema({
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
        autoValue: function () {
            var firstName = this.field("firstName").value != null ? this.field("firstName").value : "";
            var lastName = this.field("lastName").value != null ? this.field("lastName").value : "";
            return firstName + " " + lastName;
        }
    },
    gender: {
        type: String,
        label: "Gender",
        max: 1,
        allowedValues: ["M","F"]
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
        allowedValues: ["White","Black"],
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
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.user().profile.clubId
            }
        }
    },
    createdOn: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    modifiedOn: {
        type: Date,
        autoValue: function () {
            return new Date;
        }
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            return Meteor.userId();
        }
    }
});
Members.attachSchema(Schema.MemberSchema);

Schema.NotificationSchema = new SimpleSchema({
    description: {
        type: String,
        label: "Text"
    },
    read: {
        type: Boolean,
        label: "Complete"
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.user().profile.clubId
            }
        }
    },
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId()
            }
        }
    },
    createdOn: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    modifiedOn: {
        type: Date,
        autoValue: function () {
            return new Date;
        }
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            return Meteor.userId();
        }
    }
});
Notifications.attachSchema(Schema.NotificationSchema);

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
        autoValue: function () {
            var firstName = this.field("firstName").value != null ? this.field("firstName").value : "";
            var lastName = this.field("lastName").value != null ? this.field("lastName").value : "";
            return firstName + " " + lastName;
        }
    },
    gender: {
        type: String,
        label: "Gender",
        max: 1,
        allowedValues: ["M","F"]
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
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.user().profile.clubId
            }
        }
    },
    createdOn: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    modifiedOn: {
        type: Date,
        autoValue: function () {
            return new Date;
        }
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            return Meteor.userId();
        }
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
        autoValue: function () {
            var firstName = this.field("firstName").value != null ? this.field("firstName").value : "";
            var lastName = this.field("lastName").value != null ? this.field("lastName").value : "";
            return firstName + " " + lastName;
        }
    },
    gender: {
        type: String,
        label: "Gender",
        max: 1,
        allowedValues: ["M","F"]
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
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.user().profile.clubId
            }
        }
    },
    createdOn: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    modifiedOn: {
        type: Date,
        autoValue: function () {
            return new Date;
        }
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            return Meteor.userId();
        }
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
        label: "Complete",
        autoValue: function () {
            if (this.isInsert) {
                return false;
            }
        }
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            omit: true
        },
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.user().profile.clubId
            }
        }
    },
    createdOn: {
        type: Date,
        autoform: {
            omit: true
        },
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            omit: true
        },
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    modifiedOn: {
        type: Date,
        autoform: {
            omit: true
        },
        autoValue: function () {
            return new Date;
        }
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            omit: true
        },
        autoValue: function () {
            return Meteor.userId();
        }
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
        allowedValues: ["5", "10", "16", "17", "Adult"]
    },
    gender: {
        type: String,
        label: "Gender",
        max: 1,
        allowedValues: ["M","F"]
    },
    clubId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.user().profile.clubId
            }
        }
    },
    createdOn: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    modifiedOn: {
        type: Date,
        autoValue: function () {
            return new Date;
        }
    },
    modifiedBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            return Meteor.userId();
        }
    }
});
Teams.attachSchema(Schema.TeamSchema);
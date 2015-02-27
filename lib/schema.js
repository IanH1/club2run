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
    },
    location: {
        type: String,
        label: "Location",
        optional: true
    }
});

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

Schema.EventMatchSchema = new SimpleSchema({
    competition: {
        type: String,
        label: "Competition",
        max: 100,
        optional: true
    },
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
        max: 100
    },
    opponentCoaches: {
        type: [String],
        label: "Away Coaches",
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
    }
});
Schema.EventTrainingSchema = new SimpleSchema({
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
    }
});
Schema.EventMeetingSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 100,
        optional: true
    }
});
Schema.EventSchema = new SimpleSchema({
    type: {
        type: String,
        label: 'Type',
        max: 10,
        allowedValues: ["match", "training", "meeting"]
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
    location: {
        type: Schema.AddressSchema,
        label: "Location",
        optional: true
    },
    addInfo: {
        type: String,
        label: "Additional Information",
        max: 200,
        optional: true
    },
    match: {
        type: Schema.EventMatchSchema,
        optional: true
    },
    training: {
        type: Schema.EventTrainingSchema,
        optional: true
    },
    meeting: {
        type: Schema.EventMeetingSchema,
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

Schema.NotificationSchema = new SimpleSchema({
    description: {
        type: String,
        label: "Description"
    },
    read: {
        type: Boolean,
        label: "Read"
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
        allowedValues: ["5", "10", "16", "17", "Adult"]
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
        optional: true,
        autoform: {
            afFieldInput: {
                options: function () {
                    var options = [];
                    Staff.find({}, {sort: {fullName: 1}}).forEach(function (element) {
                        options.push({
                            label: element.fullName, value: element._id
                        })
                    });
                    return options;
                }
            }
        }
    },
    "coaches.$": {
        type: SimpleSchema.RegEx.Id
    },
    players: {
        type: Array,
        label: "Players",
        optional: true,
        autoform: {
            afFieldInput: {
                options: function () {
                    var options = [];
                    Members.find({}, {sort: {fullName: 1}}).forEach(function (element) {
                        options.push({
                            label: element.fullName, value: element._id
                        })
                    });
                    return options;
                }
            }
        }
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
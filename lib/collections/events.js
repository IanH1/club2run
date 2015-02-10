Events = new Mongo.Collection('events');

var schema = new SimpleSchema({
    type: {
        type: String,
        label: "Type",
        max: 20,
        allowedValues: ["Match", "Training"]
    },
    competition: {
        type: String,
        label: "Competition",
        max: 20,
        allowedValues: ["Friendly"]
    },
    meetupTime: {
        type: Date,
        label: "Meetup Time",
        optional: true,
        autoform: {
            afFieldInput: {
                type: "datetime-local"
            }
        }
    },
    startTime: {
        type: Date,
        label: "Start Time",
        autoform: {
            afFieldInput: {
                type: "datetime-local"
            }
        }
    },
    endTime: {
        type: Date,
        label: "End Time",
        optional: true,
        autoform: {
            afFieldInput: {
                type: "datetime-local"
            }
        }
    },
    location: {
        type: AddressSchema,
        label: "Location",
        optional: true
    },
    teamSize: {
        type: Number,
        label: "Team Size",
        optional: true
    },
    homeCoaches: {
        type: Array,
        label: "Home Coaches",
        optional: true,
        autoform: {
            options: function () {
                var options = [];
                Staff.find({clubId: Meteor.user().clubId}, {sort: {fullName: 1}}).forEach(function (element) {
                    options.push({
                        label: element.fullName, value: element._id
                    })
                });
                return options;
            }
        }
    },
    "homeCoaches.$": {
        type: SimpleSchema.RegEx.Id
    },
    awayCoaches: {
        type: [String],
        label: "Away Coaches",
        max: 100,
        optional: true
    },
    officals: {
        type: Array,
        label: "Officals",
        optional: true,
        autoform: {
            options: function () {
                var options = [];
                Officals.find({clubId: Meteor.user().clubId}, {sort: {fullName: 1}}).forEach(function (element) {
                    options.push({
                        label: element.fullName, value: element._id
                    })
                });
                return options;
            }
        }
    },
    "officals.$": {
        type: SimpleSchema.RegEx.Id
    },
    team: {
        type: SimpleSchema.RegEx.Id,
        label: "Team",
        autoform: {
            options: function () {
                var options = [];
                Teams.find({clubId: Meteor.user().clubId}, {sort: {name: 1}}).forEach(function (element) {
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
    status: {
        type: String,
        label: "Status",
        max: 10,
        allowedValues: ["On"]
    },
    clubId: {
        type: SimpleSchema.RegEx.Id,
        autoform : {
            omit: true
        },
        autoValue: function () {
            if (this.isInsert) {
                return Clubs.findOne()._id
            }
        }
    },
    createdOn: {
        type: Date,
        label: "Created Date",
        autoform : {
            omit: true
        },
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    //createdBy: {
    //    type: SimpleSchema.RegEx.Id,
    //    label: "Created By",
    //autoform : {
    //    omit: true
    //},
    //    autoValue: function () {
    //        if (this.isInsert) {
    //            return Meteor.userId();
    //        }
    //    }
    //},
    modifiedOn: {
        type: Date,
        label: "Modified Date",
        autoform : {
            omit: true
        },
        autoValue: function () {
            return new Date;
        }
    }
    //modifiedBy: {
    //    type: SimpleSchema.RegEx.Id,
    //    label: "Modified By",
    //autoform : {
    //    omit: true
    //},
    //    autoValue: function () {
    //        return Meteor.userId();
    //    }
    //}
});
Events.attachSchema(schema);

// To Do
// homeSquad
// awaySquad
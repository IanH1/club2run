Teams = new Mongo.Collection('teams');

var schema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    ageRange: {
        type: String,
        label: "Age Range",
        max: 20,
        allowedValues: ["Under 5", "Under 10", "Under 16", "Under 18", "Adult"]
    },
    sex: {
        type: String,
        label: "Sex",
        max: 1,
        allowedValues: ["M","F"],
        autoform: {
            options: [{
                label: "Male", value: "M"
            }, {
                label: "Female", value: "F"
            }]
        }
    },
    manager: {
        type: SimpleSchema.RegEx.Id,
        label: "Manager",
        optional: true,
        autoform: {
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
    },
    coaches: {
        type: Array,
        label: "Coaches",
        optional: true,
        autoform: {
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
    },
    "coaches.$": {
        type: SimpleSchema.RegEx.Id
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
Teams.attachSchema(schema);
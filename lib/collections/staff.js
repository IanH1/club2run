Staff = new Mongo.Collection('staff');

var schema = new SimpleSchema({
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
        label: "Full Name",
        autoform : {
            omit: true
        },
        autoValue: function () {
            return this.field("firstName").value + " " + this.field("lastName").value;
        }
    },
    role: {
        type: String,
        label: "Role",
        max: 50,
        optional: true,
        allowedValues: ["Coach", "Team Manager"]
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
Staff.attachSchema(schema);

// TO DO
// Teams
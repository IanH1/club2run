Members = new Mongo.Collection('members');

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
        autoValue: function () {
            return this.field("firstName").value + " " + this.field("lastName").value;
        }
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
    dateOfBirth: {
        type: Date,
        label: "Date of Birth",
        optional: true
    },
    email: {
        type: String,
        label: "Email",
        max: 100,
        optional: true
    },
    telephone1: {
        type: String,
        label: "Telephone",
        max: 20,
        optional: true
    },
    telephone2: {
        type: String,
        label: "Telephone",
        max: 20,
        optional: true
    },
    telephoneEmergency: {
        type: String,
        label: "Emergency Telephone",
        max: 20,
        optional: true
    },
    address: {
        type: AddressSchema,
        label: "Address",
        optional: true
    },
    ethinicity: {
        type: String,
        label: "Ethinicity",
        max: 20,
        allowedValues: ["White/British"],
        optional: true
    },
    disabilities: {
        type: [String],
        label: "Disabilities",
        max: 100,
        optional: true
    },
    allergies: {
        type: [String],
        label: "Allergies",
        max: 100,
        optional: true
    },
    otherComments: {
        type: String,
        label: "Other Comments",
        optional: true
    },
    clubId: {
        type: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Clubs.findOne()._id
            }
        }
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
    //createdBy: {
    //    type: SimpleSchema.RegEx.Id,
    //    label: "Created By",
    //    autoValue: function () {
    //        if (this.isInsert) {
    //            return Meteor.userId();
    //        }
    //    }
    //},
    modifiedOn: {
        type: Date,
        label: "Modified Date",
        autoValue: function () {
            return new Date;
        }
    }
    //modifiedBy: {
    //    type: SimpleSchema.RegEx.Id,
    //    label: "Modified By",
    //    autoValue: function () {
    //        return Meteor.userId();
    //    }
    //}
});
Members.attachSchema(schema);

// To Do
// Phone
// LinkedContacts
// Club List
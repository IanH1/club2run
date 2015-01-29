Officals = new Mongo.Collection('officals');

var officalsSchema = new SimpleSchema({
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
            return this.field("firstName").value + ' ' + this.field("lastName").value;
        }
    },
    role: {
        type: String,
        label: "Role",
        max: 20,
        allowedValues: ["Umpire"]
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
Officals.attachSchema(officalsSchema);
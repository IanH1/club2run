Clubs = new Mongo.Collection('clubs');

var schema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    type: {
        type: String,
        label: "Type",
        max: 100,
        allowedValues: ["Football", "Hockey", "Rugby Union"]
    },
    associations: {
        type: [String],
        label: "Associations",
        max: 100,
        optional: true
    },
    colours: {
        type: [String],
        label: "Colour",
        max: 20,
        optional: true
    },
    email: {
        type: String,
        label: "Email",
        max: 100,
        optional: true
    },
    websiteUrl: {
        type: String,
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
        type: AddressSchema,
        label: "Address"
    },
    secretary: {
        type: SimpleSchema.RegEx.Id,
        label: "Secretary",
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
    createdOn: {
        type: Date,
        label: "Created Date",
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
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
            return new Date();
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
Clubs.attachSchema(schema);

// TO DO
// Club Photo
// Linked Contacts
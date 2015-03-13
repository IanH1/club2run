Staff = new Mongo.Collection('staff');

Meteor.methods({
    insertStaff: function(staff) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        var fullName = staff.firstName + " " + staff.lastName;
        staff = _.extend(staff,
            {fullName: fullName},
            {clubId: Club.find()},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the staff is valid
        check(staff, Schema.Staff);

        // Insert the new staff
        var staffId = Staff.insert(staff);

        return {
            _id: staffId
        };
    },
    updateStaff: function(staff, modifier, staffId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        var fullName = staff.firstName + " " + staff.lastName;
        staff = _.extend(staff,
            {fullName: fullName},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the staff is valid
        check(staff, Schema.Staff);

        // Update the existing staff
        Staff.update(staffId, {$set: staff});
    },
    deleteStaff: function(staffId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Club.find())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing staff
        Staff.remove(staffId);
    }
});
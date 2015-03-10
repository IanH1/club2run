Staff = new Mongo.Collection('staff');

Meteor.methods({
    insertStaff: function(staff) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        var fullName = staff.firstName + " " + staff.lastName;
        staff = _.extend(staff,
            {fullName: fullName},
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the staff is valid
        check(staff, Schema.StaffSchema);

        // Insert the new staff
        var staffId = Staff.insert(staff);

        // Add notification
        Meteor.call("insertNotification", {description: "Staff created by " + Meteor.user().profile.fullName, link: 'staffEdit', linkId: staffId});

        return {
            _id: staffId
        };
    },
    updateStaff: function(staff, modifier, staffId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
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
        check(staff, Schema.StaffSchema);

        // Update the existing staff
        Staff.update(staffId, {$set: staff});

        // Add notification
        Meteor.call("insertNotification", {description: "Staff updated by " + Meteor.user().profile.fullName, link: 'staffEdit', linkId: staffId});
    },
    deleteStaff: function(staffId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing staff
        Staff.remove(staffId);

        // Add notification
        Meteor.call("insertNotification", {description: "Staff deleted by " + Meteor.user().profile.fullName});
    }
});
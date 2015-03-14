// Create the collection
Staff = new Mongo.Collection('staff');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new staff document.
         */
        insertStaff: function(staff) {

            Meteor.user().profile.clubId
            Meteor.user().profile.clubId
            console.log(Club.find().fetch());
            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            staff = _.extend(staff,
                {fullName: staff.firstName + " " + staff.lastName},
                {clubId: Meteor.user().profile.clubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the staff is valid
            check(staff, Schema.Staff);

            // Insert the new staff document
            var staffId = Staff.insert(staff);

            return { _id: staffId };
        },

        /*
         * Update a staff document.
         */
        updateStaff: function(staff, modifier, staffId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            staff = _.extend(staff,
                {fullName: staff.firstName + " " + staff.lastName},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the staff is valid
            check(staff, Schema.Staff);

            // Update the staff document
            Staff.update(staffId, { $set: staff });
        },

        /*
         * Delete a staff document.
         */
        deleteStaff: function(staff) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the staff document
            Staff.remove(staff._id);
        }
    });
}
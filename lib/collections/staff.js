// Create the collection
Staff = new Mongo.Collection("staff");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a member of staff.
         *
         * @param   staff - the staff to insert
         *
         * @return  The id of the inserted staff
         */
        insertStaff: function(staff) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            staff = _.extend(staff,
                {fullName: staff.firstName + " " + staff.lastName},
                {clubId: Meteor.user().profile.currentClubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the staff is valid
            check(staff, Schema.Staff);

            // Insert the new staff
            var staffId = Staff.insert(staff);

            return { _id: staffId };
        },

        /*
         * Update a member of staff.
         *
         * @param   staff - the staff to update
         * @param   modifier - modifier generated from the form values
         * @param   staffId - the staff id
         */
        updateStaff: function(staff, modifier, staffId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], staff.clubId)) {
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

            // Update the staff
            Staff.update(staffId, { $set: staff });
        },

        /*
         * Delete a member of staff.
         *
         * @param   staff - the staff to delete
         */
        deleteStaff: function(staff) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], staff.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the staff member
            Staff.remove(staff._id);
        }
    });
}
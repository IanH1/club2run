// Create the collection
Staff = new Mongo.Collection("staff");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a member of staff.
         *
         * @param   staff - the staff to insert
         * @param   clubId - the current club
         *
         * @return  The id of the inserted staff
         */
        insertStaff: function(staff, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            staff = _.extend(staff,
                {fullName: staff.firstName + " " + staff.lastName},
                {clubId: clubId},
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

            // Update the staff document
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

            // Delete the staff
            Staff.remove(staff._id);
        }
    });
}
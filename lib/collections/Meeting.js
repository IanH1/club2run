// Create the collection
Meeting = new Mongo.Collection("meeting");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a meeting.
         *
         * @param   meeting - the meeting to insert
         *
         * @return  The id of the inserted meeting
         */
        insertMeeting: function(meeting) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            meeting = _.extend(meeting,
                {clubId: Meteor.user().profile.currentClubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the meeting is valid
            check(meeting, Schema.Meeting);

            // Insert the new meeting
            var meetingId = Meeting.insert(meeting);

            return { _id: meetingId };
        },

        /*
         * Update a meeting.
         *
         * @param   meeting - the meeting to update
         * @param   modifier - modifier generated from the form values
         * @param   meetingId - the meeting id
         */
        updateMeeting: function(meeting, modifier, meetingId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], meeting.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            meeting = _.extend(meeting,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the meeting is valid
            check(meeting, Schema.Meeting);

            // Update the meeting
            Meeting.update(meetingId, { $set: meeting });
        },

        /*
         * Delete a meeting.
         *
         * @param   meeting - the meeting to delete
         */
        deleteMeeting: function(meeting) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], meeting.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the meeting
            Meeting.remove(meeting._id);
        },

        /*
         * Update a meeting invite for the current user.
         *
         * @param   meeting -
         * @param   availability -
         */
        updateMeetingInvite: function(meeting, availability) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], meeting.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the meeting
            Meeting.update({ _id: meeting._id, 'attendeeIds.userId': Meteor.userId() }, { $set: { 'attendeeIds.$.availability': availability }});
        }
    });
}
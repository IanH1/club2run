// Create the collection
Meeting = new Mongo.Collection('meeting');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new meeting.
         */
        insertMeeting: function(meeting) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            meeting = _.extend(meeting,
                {clubId: Club.find()},
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
         */
        updateMeeting: function(meeting, modifier, meetingId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Club.find())) {
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
         */
        deleteMeeting: function(meetingId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the meeting
            Meeting.remove(meetingId);
        },

        /*
         * Update a meeting invite for the current user.
         */
        updateMeetingInvite: function(meetingId, availability) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the meeting
            Meeting.update({ _id: meetingId, 'attendeeIds.userId': Meteor.userId() }, { $set: { 'attendeeIds.$.availability': availability }});
        },
    });
}
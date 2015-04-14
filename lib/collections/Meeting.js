// Create the collection
Meeting = new Mongo.Collection("meeting");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({



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
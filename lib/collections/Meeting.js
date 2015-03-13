// Create the collection
Meeting = new Mongo.Collection('meeting');

// Meeting methods
Meteor.methods({
    insertMeeting: function(meeting) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        meeting = _.extend(meeting,
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the meeting is valid
        check(meeting, Schema.Meeting);

        // Insert the new meeting
        var meetingId = Meeting.insert(meeting);

        return {
            _id: meetingId
        };
    },
    updateMeeting: function(meeting, modifier, meetingId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        meeting = _.extend(meeting,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the meeting is valid
        check(meeting, Schema.Meeting);

        // Update the meeting
        Meeting.update(meetingId, {$set: meeting});
    },
    updateMeetingInvite: function(meetingId, status) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Update the meeting
        Meeting.update({ _id: meetingId, 'attendeeIds.userId': Meteor.userId() }, { $set: {'attendeeIds.$.availability': status }});
    },
    deleteMeeting: function(meetingId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "user"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the meeting
        Meeting.remove(meetingId);
    }
});
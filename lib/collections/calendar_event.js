// Create the collection
CalendarEvent = new Mongo.Collection("calendar_event");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a CalendarEvent.
         *
         * @param   calendarEvent - the CalendarEvent to insert
         *
         * @return  The id of the inserted CalendarEvent
         */
        insertCalendarEvent: function(calendarEvent) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            calendarEvent = _.extend(calendarEvent,
                {clubId: Meteor.user().profile.currentClubId},
                {createdOn: new Date()},
                {createdBy: Meteor.userId()},
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the CalendarEvent is valid
            check(calendarEvent, Schema.CalendarEvent);

            // Insert the new CalendarEvent
            var calendarEventId = CalendarEvent.insert(calendarEvent);

            return { _id: calendarEventId };
        },

        /*
         * Update a CalendarEvent.
         *
         * @param   calendarEvent - the CalendarEvent to update
         * @param   modifier - modifier generated from the form values
         * @param   calendarEventId - the CalendarEvent id
         */
        updateCalendarEvent: function(calendarEvent, modifier, calendarEventId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], calendarEvent.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            calendarEvent = _.extend(calendarEvent,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the CalendarEvent is valid
            check(calendarEvent, Schema.CalendarEvent);

            // Update the CalendarEvent
            CalendarEvent.update(calendarEventId, { $set: calendarEvent });
        },

        /*
         * Delete a CalendarEvent.
         *
         * @param   calendarEvent - the CalendarEvent to delete
         */
        deleteCalendarEvent: function(calendarEvent) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], calendarEvent.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the CalendarEvent
            CalendarEvent.remove(calendarEvent._id);
        },

        /*
         * Update a meeting invite for the current user.
         *
         * @param   calendarEvent -
         * @param   availability -
         */
        updateMeetingInvite: function(calendarEvent, availability) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], calendarEvent.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the meeting
            CalendarEvent.update({ _id: calendarEvent._id, 'meeting.attendeeIds.userId': Meteor.userId() }, { $set: { 'meeting.attendeeIds.$.availability': availability }});
        }
    });
}
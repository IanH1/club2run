Events = new Mongo.Collection('events');

Meteor.methods({
    insertEvent: function(event) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        event = _.extend(event,
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the event is valid
        check(event, Schema.EventSchema);

        // Insert the new event
        var eventId = Events.insert(event);

        // Add notification
        Meteor.call("insertNotification", {description: capitalize(event.type) + " created by " + Meteor.user().profile.fullName});

        return {
            _id: eventId
        };
    },
    updateEvent: function(event, modifier, eventId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        event = _.extend(event,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the event is valid
        check(event, Schema.EventSchema);

        // Update the existing event
        Events.update(eventId, {$set: event});

        // Add notification
        Meteor.call("insertNotification", {description: capitalize(event.type) + " updated by " + Meteor.user().profile.fullName});
    },
    deleteEvent: function(eventId, eventType) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin', 'club_admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing event
        Events.remove(eventId);

        // Add notification
        Meteor.call("insertNotification", {description: capitalize(eventType) + " deleted by " + Meteor.user().profile.fullName});
    }
});

// Client side permissions
Events.allow({
    insert: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin', 'club_admin'], Roles.GLOBAL_GROUP);
    },
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin', 'club_admin'], Roles.GLOBAL_GROUP);
    },
    remove: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin', 'club_admin'], Roles.GLOBAL_GROUP);
    }
});

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}
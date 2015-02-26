Events = new Mongo.Collection('events');

Meteor.methods({
    insertEvent: function(eventAttributes) {

        var event = _.extend(eventAttributes, {
            clubId: Meteor.user().profile.clubId,
            createdOn: new Date(),
            createdBy: Meteor.userId(),
            modifiedOn: new Date(),
            modifiedBy: Meteor.userId()
        });

        check(event, Schema.EventSchema);

        return {
            _id: Events.insert(event)
        };
    },
    updateEvent: function(eventAttributes, modifier, eventId) {

        var event = _.extend(eventAttributes, {
            modifiedOn: new Date(),
            modifiedBy: Meteor.userId()
        });

        check(event, Schema.EventSchema);

        Events.update(eventId, {$set: eventAttributes});
    }
});

// Collection hooks
Meteor.isClient && Events.after.insert(function(userId, event) {
    var notificationString;
    var confirmationString;

    if (event.type === "match") {
        notificationString = "Match '" + event.match.opponent + "' created by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Match '" + event.match.opponent + "' successfully created.";
    }
    else if (event.type === "training") {
        notificationString = "Training '" + event.training.team + "' created by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Training '" + event.training.team + "' successfully created.";
    }
    else if (event.type === "meeting") {
        notificationString = "Meeting '" + event.meeting.title + "' created by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Meeting '" + event.meeting.title + "' successfully created.";
    }

    // Add a new notification
    Notifications.insert({
        description: notificationString,
        read: false,
        userId: userId
    });

    // Display a confirmation message
    FlashMessages.sendSuccess(confirmationString);
});
Meteor.isClient && Events.after.update(function(userId, event) {
    var notificationString;
    var confirmationString;

    if (event.type === "match") {
        notificationString = "Match '" + event.match.opponent + "' updated by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Match '" + event.match.opponent + "' successfully updated.";
    }
    else if (event.type === "training") {
        notificationString = "Training '" + event.training.team + "' updated by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Training '" + event.training.team + "' successfully updated.";
    }
    else if (event.type === "meeting") {
        notificationString = "Meeting '" + event.meeting.title + "' updated by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Meeting '" + event.meeting.title + "' successfully updated.";
    }

    // Add a new notification
    Notifications.insert({
        description: notificationString,
        read: false,
        userId: userId
    });

    // Display a confirmation message
    FlashMessages.sendSuccess(confirmationString);
});
Meteor.isClient && Events.after.remove(function(userId, event) {
    var notificationString;
    var confirmationString;

    if (event.type === "match") {
        notificationString = "Match '" + event.match.opponent + "' deleted by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Match '" + event.match.opponent + "' successfully deleted.";
    }
    else if (event.type === "training") {
        notificationString = "Training '" + event.training.team + "' deleted by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Training '" + event.training.team + "' successfully deleted.";
    }
    else if (event.type === "meeting") {
        notificationString = "Meeting '" + event.meeting.title + "' deleted by '" + Meteor.user().profile.fullName + "'.";
        confirmationString = "Meeting '" + event.meeting.title + "' successfully deleted.";
    }

    // Add a new notification
    Notifications.insert({
        description: notificationString,
        read: false,
        userId: userId
    });

    // Display a confirmation message
    FlashMessages.sendSuccess(confirmationString);
});

// Client side permissions
Events.allow({
    insert: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    remove: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    }
});
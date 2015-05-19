Meteor.publish(null, function() {
    return Meteor.roles.find({});
});

Meteor.publishComposite("club", function(clubId) {
    return {
        find: function() {
            if (this.userId) {
                if (clubId && Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                    return Club.find({ _id: clubId });
                }
            }
        },
        children: [{
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                    return Article.find({ clubId: club._id }, { sort: {createdOn: -1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                    return CalendarEvent.find({ clubId: club._id }, { sort: { startDateTime: -1 }});
                }
            },
            children: [{
                find: function(event, club) {
                    var userId = this.userId;
                    var messageBoards = [];

                    // Determine the message boards the user has access too
                    MessageBoard.find({ eventId: event._id, clubId: club._id }, { sort: {createdOn: -1 }}).forEach(function(messageBoard) {
                        //if (Roles.userIsInRole(userId, ['player'], messageBoard.teamId)) {
                            messageBoards.push(messageBoard);
                        //}
                    });

                    // Get the id's of all the message boards
                    var messageBoardIds = _.pluck(messageBoards, "_id");

                    // Finally publish a reactive cursor containing each message board (necessary as a cursor must be returned)
                    return MessageBoard.find({ _id : { $in : messageBoardIds }});
                }
            }]
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin"], clubId)) {
                    return Meteor.users.find({ 'profile.clubIds': club._id }, { sort: {name: 1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["user"], clubId)) {
                    return Notification.find({ clubId: club._id, userId: this.userId }, { sort: {createdOn: -1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                    return Official.find({ clubId: club._id }, { sort: {fullName: 1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "manager"], clubId)) {
                    return Team.find({ _id : { $in : club.opponents }}, { sort: { name: 1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                    return Team.find({ clubId: club._id }, { sort: {name: 1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                    return Staff.find({ clubId: club._id }, { sort: {fullName: 1 }});
                }
            }
        }]
    }
});

Meteor.publish('clubs', function() {
    return Club.find();
});

Meteor.publish('clubsForUser', function() {
    var user = Meteor.users.findOne(this.userId);
    if (user) {
        return Club.find({ _id: {$in: user.profile.clubIds }});
    }
});

Meteor.publish('calendarEventsForUser', function() {
    var user = Meteor.users.findOne(this.userId);
    var calendarEvents = [];
    if (user) {

        // Find all events created by the user
        CalendarEvent.find({ createdBy: user._id }, { sort: {startDateTime: -1 }}).forEach(function(calendarEvent) {
            calendarEvents.push(calendarEvent);
        });

        // Find all fixtures the current user has been selected in
        CalendarEvent.find({ 'fixture.squad.userId': user._id }, { sort: {startDateTime: -1 }}).forEach(function(calendarEvent) {
            calendarEvents.push(calendarEvent);
        });
        
        // Find all meetings the current user has been invited too
        CalendarEvent.find({ 'meeting.attendeeIds.userId': user._id }, { sort: {startDateTime: -1 }}).forEach(function(calendarEvent) {
            calendarEvents.push(calendarEvent);
        });
    }

    // Finally publish a reactive cursor containing each CalendarEvent (necessary as a cursor must be returned)
    return CalendarEvent.find({ _id : { $in : _.pluck(calendarEvents, "_id") }});
});

Meteor.publish('profilePictures', function() {
    return ProfilePicture.find();
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({ _id: this.userId }, { fields: {'status': 1 }});
});
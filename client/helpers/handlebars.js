Template.registerHelper("Schema", Schema);
Template.registerHelper("Users", Meteor.users);

Template.registerHelper("articleCount", function() {
    return Article.find().count();
});

Template.registerHelper("eventCount", function() {
    return CalendarEvent.find().count();
});

Template.registerHelper("fixtureCount", function() {
    return CalendarEvent.find({ eventType: "fixture" }).count();
});

Template.registerHelper("meetingCount", function() {
    return CalendarEvent.find({ eventType: "meeting" }).count();
});

Template.registerHelper("messageCount", function() {
    var totalMessages = 0;
    MessageBoard.find().forEach(function(messageBoard) {
        if (messageBoard.messages) {
            totalMessages = totalMessages + messageBoard.messages.length;
        }
    });
    return totalMessages;
});

Template.registerHelper("notificationCount", function() {
    return Notification.find().count();
});

Template.registerHelper("officialCount", function() {
    return Official.find().count();
});

Template.registerHelper("staffCount", function() {
    return Staff.find().count();
});

Template.registerHelper("teamCount", function() {
    return Team.find().count();
});

Template.registerHelper("trainingCount", function() {
    return CalendarEvent.find({ eventType: "training" }).count();
});

Template.registerHelper("userCount", function() {
    return Meteor.users.find().count();
});

Template.registerHelper("officialOptions", function() {
    var options = [];
    Official.find({}, {sort: { fullName: 1 }}).forEach(function(obj) {
        options.push({
            label: obj.fullName, value: obj._id
        })
    });
    return options;
});

Template.registerHelper("opponentOptions", function() {
    var options = [];
    var club = Club.findOne(Meteor.user().profile.currentClubId)
    if (club && club.opponents) {
        Team.find({ _id : { $in : club.opponents }}).forEach(function(obj) {
            options.push({
                label: obj.name, value: obj._id
            })
        });
    }
    return options;
});

Template.registerHelper("positionOptions", function() {
    var options = [];
    var club = Club.findOne(Meteor.user().profile.currentClubId);
    if (club) {
        club.type.positions.forEach(function(obj) {
            options.push({
                label: obj.type, value: obj._id
            })
        });
    }
    return options;
});

Template.registerHelper("memberTypeOptions", function() {
    var options = [];
    var club = Club.findOne(Meteor.user().profile.currentClubId);
    if (club && club.member) {
        club.member.forEach(function(obj) {
            options.push({
                label: obj.type, value: obj.type
            })
        });
    }
    return options;
});

Template.registerHelper("staffOptions", function() {
    var options = [];
    Staff.find({}, { sort: { fullName: 1 }}).forEach(function(obj) {
        options.push({
            label: obj.fullName, value: obj._id
        })
    });
    return options;
});

Template.registerHelper("teamOptions", function() {
    var options = [];
    Team.find({}, { sort: { name: 1 }}).forEach(function(obj) {
        options.push({
            label: obj.name, value: obj._id
        })
    });
    return options;
});

Template.registerHelper("userOptions", function() {
    var options = [];
    Meteor.users.find({}, { sort: { 'profile.fullName': 1 }}).forEach(function(obj) {
        options.push({
            label: obj.profile.fullName, value: obj._id
        })
    });
    return options;
});

Template.registerHelper("currentClub", function() {
    return Club.findOne(Meteor.user().profile.currentClubId);
});

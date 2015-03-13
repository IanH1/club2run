Template.registerHelper('Schema', Schema);
Template.registerHelper('Users', Meteor.users);

Template.registerHelper("userOptions", function() {
    var options = [];
    Meteor.users.find({}, { sort: {'profile.fullName': 1} }).forEach(function(user) {
        options.push({
            label: user.profile.fullName, value: user._id
        })
    });
    return options;
});

Template.registerHelper("officialOptions", function() {
    var options = [];
    Official.find({}, {sort: {fullName: 1}}).forEach(function(official) {
        options.push({
            label: official.fullName, value: official._id
        })
    });
    return options;
});

Template.registerHelper("staffOptions", function() {
    var options = [];
    Staff.find({}, { sort: {fullName: 1} }).forEach(function(staff) {
        options.push({
            label: staff.fullName, value: staff._id
        })
    });
    return options;
});

Template.registerHelper("teamOptions", function() {
    var options = [];
    Team.find({}, { sort: {name: 1} }).forEach(function(team) {
        options.push({
            label: team.name, value: team._id
        })
    });
    return options;
});

Template.registerHelper("positionOptions", function() {
    var options = [];
    var club = Club.findOne();
    if (club) {
        club.type.positions.forEach(function(position) {
            options.push({
                label: position, value: position
            })
        });
    }
    return options;
});

Template.registerHelper('currentClub', function() {
    return Club.findOne();
});

Template.registerHelper('articleCount', function() {
    return Article.find().count();
});

Template.registerHelper('eventCount', function() {
    return Fixture.find().count() + Meeting.find().count() + Training.find().count();
});

Template.registerHelper('messageCount', function() {
    return Message.find().count();
});

Template.registerHelper('notificationCount', function() {
    return Notification.find().count();
});

Template.registerHelper('officialCount', function() {
    return Official.find().count();
});

Template.registerHelper('staffCount', function() {
    return Staff.find().count();
});

Template.registerHelper('taskCount', function() {
    return Task.find({ complete: {$ne: true} }).count();
});

Template.registerHelper('teamCount', function() {
    return Team.find().count();
});

Template.registerHelper('userCount', function() {
    return Meteor.users.find().count();
});
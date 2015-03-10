Template.registerHelper('Schema', Schema);
Template.registerHelper('Users', Meteor.users);
Template.registerHelper('TabularTables', TabularTables);

Template.registerHelper("memberOptions", function() {
    var options = [];
    Members.find({}).forEach(function(member) {
        options.push({
            label: member.fullName, value: member._id
        })
    });
    return options;
});

Template.registerHelper("officialsOptions", function() {
    var options = [];
    Officials.find({}, {sort: {fullName: 1}}).forEach(function (element) {
        options.push({
            label: element.fullName, value: element._id
        })
    });
    return options;
});

Template.registerHelper("staffOptions", function() {
    var options = [];
    Staff.find({}, {sort: {fullName: 1}}).forEach(function (element) {
        options.push({
            label: element.fullName, value: element._id
        })
    });
    return options;
});

Template.registerHelper("teamOptions", function() {
    var options = [];
    Teams.find({}, {sort: {name: 1}}).forEach(function(element) {
        options.push({
            label: element.name, value: element._id
        })
    });
    return options;
});

Template.registerHelper('currentClub', function() {
    return Clubs.findOne();
});

Template.registerHelper('articleCount', function() {
    return Articles.find().count();
});

Template.registerHelper('eventCount', function() {
    return Events.find().count();
});

Template.registerHelper('memberCount', function() {
    return Members.find().count();
});

Template.registerHelper('messageCount', function() {
    return Messages.find().count();
});

Template.registerHelper('notificationCount', function() {
    return Notifications.find().count();
});

Template.registerHelper('officialCount', function() {
    return Officials.find().count();
});

Template.registerHelper('staffCount', function() {
    return Staff.find().count();
});

Template.registerHelper('taskCount', function() {
    return Tasks.find({complete: {$ne: true}}).count();
});

Template.registerHelper('teamCount', function() {
    return Teams.find().count();
});


Template.registerHelper("tmpOptions", function() {
    return [
        {label: 'Available', value: 'Available'},
        {label: 'Unavailable', value: 'Unavailable'}
    ];
});
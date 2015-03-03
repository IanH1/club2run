Template.registerHelper('Schema', Schema);
Template.registerHelper('Users', Meteor.users);
Template.registerHelper('TabularTables', TabularTables);

Template.registerHelper('currentArticle', function() {
    return Articles.findOne();
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
    return Notifications.find({read: {$ne: true}}).count();
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

// Form option values
Template.registerHelper("genderOptions", function() {
    return [
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'}
    ];
});
Template.registerHelper("ethinicityOptions", function() {
    return [
        {label: 'White', value: 'White'},
        {label: 'Black', value: 'Black'}
    ];
});
Template.registerHelper("ageOptions", function() {
    return [
        {label: 'Under 5', value: '5'},
        {label: 'Under 10', value: '10'},
        {label: 'Under 16', value: '16'},
        {label: 'Under 17', value: '17'},
        {label: 'Adult', value: 'Adult'}
    ];
});
Template.registerHelper("officialOptions", function() {
    return [
        {label: 'Umpire', value: 'Umpire'}
    ];
});
Template.registerHelper("staffOptions", function() {
    return [
        {label: 'Coach', value: 'Coach'}
    ];
});
Template.registerHelper("clubTypeOptions", function() {
    return [
        {label: 'Football', value: 'Football'},
        {label: 'Hockey', value: 'Hockey'},
        {label: 'Rugby Union', value: 'Rugby Union'}
    ];
});
Template.registerHelper("eventTypeOptions", function() {
    return [
        {label: 'Match', value: 'match'},
        {label: 'Training', value: 'training'},
        {label: 'Meeting', value: 'meeting'},
        {label: 'Tournament', value: 'tournament'}
    ];
});

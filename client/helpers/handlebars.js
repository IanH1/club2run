Template.registerHelper('Schema', Schema);
Template.registerHelper('Users', Meteor.users);
Template.registerHelper('TabularTables', TabularTables);

Template.registerHelper('currentClub', function() {
    return Clubs.findOne();
});
Template.registerHelper('collectionItems', function() {
    return _.map(collectionItems, function(obj) {
        return obj;
    })
});
Template.registerHelper('collectionObject', function() {
    return Session.get("collectionObject");
});
Template.registerHelper('collectionMode', function() {
    return Session.get("collectionMode");
});

Template.registerHelper('notificationCount', function() {
    return Notifications.find({read: {$ne: true}}).count();
});
Template.registerHelper('taskCount', function() {
    return Tasks.find({complete: {$ne: true}}).count();
});

// Form option values
Template.registerHelper("genderOptions", function() {
    return [
        {label: 'Male', value: 'M'},
        {label: 'Female', value: 'F'}
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

Template.registerHelper("checkedIf", function(val) {
    return val ? 'checked' : '';
});
Template.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});
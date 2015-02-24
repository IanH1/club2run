Template.registerHelper('formatDate', function(datetime) {
    if (moment && datetime) {
        return moment(datetime).format('DD/MM/YYYY');
    } else{
        return datetime;
    }
});

Template.registerHelper('formatDateTime', function(datetime) {
    if (moment && datetime) {
        if (datetime.getDate() === new Date().getDate()) {
            return "Today " + moment(datetime).format("HH:mm:ss");
        } else{
            return moment(datetime).format("MMMM Do YYYY, HH:mm:ss");
        }
    } else {
        return datetime;
    }
});

Template.registerHelper("formatDateFromNow", function(datetime) {
    if (moment && datetime) {
        return moment(new Date(timestamp)).fromNow();
    } else {
        return datetime;
    }
});

Template.registerHelper("checkedIf", function(val) {
    return val ? 'checked' : '';
});

Template.registerHelper('checkRole', function(userId, roleName) {
    return (Roles.userIsInRole(userId, [roleName]) || Roles.userIsInRole(userId,['admin']));
});
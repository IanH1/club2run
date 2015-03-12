Template.registerHelper('formatDate', function(datetime) {
    if (moment && datetime) {
        if (datetime.getDate() === new Date().getDate()) {
            return "Today";
        } else{
            return moment(datetime).format("MMMM Do YYYY");
        }
    } else {
        return datetime;
    }
});

Template.registerHelper('formatTime', function(datetime) {
    if (moment && datetime) {
        return moment(datetime).format("HH:mm:ss");
    } else {
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
        return moment(new Date(datetime)).fromNow();
    } else {
        return datetime;
    }
});

Template.registerHelper("checkedIf", function(value) {
    return value ? 'checked' : '';
});

Template.registerHelper('equals', function (value1, value2) {
    return value1 === value2;
});

Template.registerHelper('not', function(value) {
    return (!value);
});

Template.registerHelper('trimString', function(value, length) {
    if (value && value.length > length) {
        return value.substring(0, length) + "..."
    } else {
        return value;
    }
});

Template.registerHelper('profileThumbnailSrc', function(_id) {
    if (typeof Meteor.users !== 'undefined') {
        if (Meteor.users.findOne(_id)) {
            var user = Meteor.users.findOne(_id);
            if (typeof user.profile !== 'undefined' && typeof user.profile.picture !== 'undefined') {
                var picture = user.profile.picture;
                if (picture.indexOf('/') > -1) {
                    return picture;
                } else {
                    if (typeof ProfilePicture !== 'undefined' && ProfilePicture.findOne(user.profile.picture)) {
                        var picture = ProfilePicture.findOne(picture);
                        return picture.url({ store: 'thumbs' });
                    }
                }
            }
        }
    }
});
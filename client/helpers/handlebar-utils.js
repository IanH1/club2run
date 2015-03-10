Template.registerHelper('formatDate', function(datetime) {
    if (moment && datetime) {
        return moment(datetime).format('DD/MM/YYYY');
    } else{
        return datetime;
    }
});

Template.registerHelper('formatDate', function(datetime) {
    if (moment && datetime) {
        if (datetime.getDate() === new Date().getDate()) {
            return "Today ";
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

Template.registerHelper("checkedIf", function(val) {
    return val ? 'checked' : '';
});

Template.registerHelper('checkRole', function(userId, roleName) {
    return (Roles.userIsInRole(userId, [roleName]) || Roles.userIsInRole(userId,['admin']));
});

Template.registerHelper('equals', function (val1, val2) {
    return val1 === val2;
});

Template.registerHelper('not', function(val) {
    return (!val);
});

Template.registerHelper('profileThumbSrc', function(_id) {
    var picture, user;
    if (typeof Meteor.users !== 'undefined') {
        if (Meteor.users.findOne(_id)) {
            user = Meteor.users.findOne({
                _id: _id
            });
            if (typeof user.profile !== 'undefined' && typeof user.profile.picture !== 'undefined') {
                picture = user.profile.picture;
                if (picture.indexOf('/') > -1) {
                    return picture;
                } else {
                    if (typeof ProfilePictures !== 'undefined' && ProfilePictures.findOne(user.profile.picture)) {
                        picture = ProfilePictures.findOne(picture);
                        return picture.url({
                            store: 'thumbs'
                        });
                    }
                }
            }
        }
    }
});
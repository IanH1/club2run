Meteor.publish(null, function() {
    return Meteor.roles.find({});
});

Meteor.publishComposite("club", function(clubId) {
    return {
        find: function() {
            if (this.userId) {
                if (clubId && Roles.userIsInRole(this.userId, ["admin", "player", "member"], clubId)) {
                    return Clubs.find({ _id: clubId });
                }
            }
        },
        children: [{
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "member"], clubId)) {
                    return Articles.find({ clubId: club._id }, { sort: {createdOn: -1 }});
                }
            }
        }, {
            find: function (club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "member"], clubId)) {
                    return Events.find({clubId: club._id}, {sort: {startDateTime: -1}});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["member"], clubId)) {
                    return Members.find({ clubId: club._id }, { sort: {fullName: 1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "member"], clubId)) {
                    return Messages.find({ clubId: club._id }, { sort: {createdOn: -1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["member"], clubId)) {
                    return Notifications.find({ clubId: club._id }, { sort: {createdOn: -1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "member"], clubId)) {
                    return Officials.find({ clubId: club._id }, { sort: {fullName: 1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["member"], clubId)) {
                    return Tasks.find({ clubId: club._id }, { sort: {createdOn: -1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "member"], clubId)) {
                    return Teams.find({ clubId: club._id }, { sort: {name: 1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "member"], clubId)) {
                    return Staff.find({ clubId: club._id }, { sort: {fullName: 1 }});
                }
            }
        }]
    }
});

Meteor.publish('profilePictures', function() {
    return ProfilePictures.find();
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({ _id: this.userId }, { fields: {'status': 1 }});
});
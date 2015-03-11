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
                    return Articles.find({ clubId: club._id }, { sort: {createdOn: -1 }});
                }
            }
        }, {
            find: function (club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                    return Events.find({clubId: club._id}, {sort: {startDateTime: -1}});
                }
            }
            ,
            children: [{
                find: function(event, club) {
                    if (Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                        return TeamSelections.find({matchId: event._id, clubId: club._id}, {});
                    }
                }
            }]
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["user"], clubId)) {
                    return Members.find({ clubId: club._id }, { sort: {fullName: 1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["admin", "player", "user"], clubId)) {
                    return Messages.find({ clubId: club._id }, { sort: {createdOn: -1 }});
                }
            }
        }, {
            find: function(club) {
                if (Roles.userIsInRole(this.userId, ["user"], clubId)) {
                    return Notifications.find({ clubId: club._id }, { sort: {createdOn: -1 }});
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
                if (Roles.userIsInRole(this.userId, ["user"], clubId)) {
                    return Tasks.find({ clubId: club._id }, { sort: {createdOn: -1 }});
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
                if (Roles.userIsInRole(this.userId, ["admin", "player", "member"], clubId)) {
                    return Staff.find({ clubId: club._id }, { sort: {fullName: 1 }});
                }
            }
        }]
    }
});

Meteor.publish('teamsel', function() {
    return TeamSelections.find();
});

Meteor.publish('profilePictures', function() {
    return ProfilePicture.find();
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({ _id: this.userId }, { fields: {'status': 1 }});
});
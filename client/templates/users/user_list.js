Template.userList.helpers({
    users: function() {
        return Meteor.users.find();
    },
    email: function() {
        if (this.emails) {
            return this.emails[0].address;
        }
    }
});

Template.userList.events({
    'click .delete': function() {
        var user = this;
        bootbox.confirm("Are you sure you want to remove this user from the club?", function(result) {
            if (result) {
                Meteor.call("removeUser", user, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("User successfully removed.");
                        Router.go("userList");
                    }
                });
            }
        });
    }
});
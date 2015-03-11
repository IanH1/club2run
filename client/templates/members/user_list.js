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
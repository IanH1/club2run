Clubs = new Mongo.Collection('clubs');

Clubs.allow({
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['admin'], Roles.GLOBAL_GROUP);
    }
});
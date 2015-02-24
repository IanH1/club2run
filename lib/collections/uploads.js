Uploads = new FS.Collection('uploads', {
    stores: [new FS.Store.FileSystem('uploads', {path: './uploads'})]
});

// Client side permissions
Uploads.allow({
    insert: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    update: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    remove: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    },
    download: function(userId) {
        return userId && Roles.userIsInRole(userId, ['club_admin'], Roles.GLOBAL_GROUP);
    }
});
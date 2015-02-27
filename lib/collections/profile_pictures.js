ProfilePictures = new FS.Collection("profilePictures", {
    stores: [new FS.Store.GridFS("thumbs", {})],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

ProfilePictures.allow({
    insert: function(userId) {
        return !! userId;
    },
    update: function(userId) {
        return !! userId;
    },
    download: function(userId) {
        return !! userId;
    }
});
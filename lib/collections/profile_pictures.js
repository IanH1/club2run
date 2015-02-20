ProfilePictures = new FS.Collection("profilePictures", {
    stores: [new FS.Store.GridFS("thumbs", {})],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

ProfilePictures.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return !! userId;
    },
    download: function(userId) {
        return !! userId;
    }
});
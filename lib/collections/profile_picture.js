// Create the collection
ProfilePicture = new FS.Collection("profilePicture", {
    stores: [new FS.Store.GridFS("thumbs", {})],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

ProfilePicture.allow({
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
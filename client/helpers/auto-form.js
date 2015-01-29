AutoForm.addHooks(null, {
    after: {
        insert: function(error, result) {
            if (error) {
                console.log("Insert Error:", error);
            } else {
                console.log("Insert Result:", result);
            }
        },
        update: function(error) {
            if (error) {
                console.log("Update Error:", error);
            } else {
                console.log("Updated");
            }
        }
    }
});
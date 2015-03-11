AutoForm.addHooks(null, {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
    },
    onError: function(operation, error) {
        FlashMessages.sendError(error.message);
    }
});
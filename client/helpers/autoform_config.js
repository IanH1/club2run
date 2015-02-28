AutoForm.addHooks(null, {
    onError: function(operation, error) {
        FlashMessages.sendError(error.message);
    }
});
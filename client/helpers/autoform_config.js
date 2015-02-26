AutoForm.addHooks(null, {
    onError: function(operation, error, template) {

        // Display an error message
        FlashMessages.sendError(error.message);
    }
});
AutoForm.addHooks(null, {
    onError: function(operation, error) {
        if (error.reason) {
            FlashMessages.sendError(error.reason);
        } else if (error.message) {
            FlashMessages.sendError(error.message);
        } else {
            FlashMessages.sendError(error);
        }
        console.log("An error occured submitting form : " + operation + ", error : " + error);
    }
});
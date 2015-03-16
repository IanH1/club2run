AutoForm.addHooks(null, {
    onError: function(operation, error) {
        console.log("An error occured submitting form :" + operation + ", error : " + error);
        FlashMessages.sendError(error.reason);
    }
});
// Local (client-only) collection
Errors = new Mongo.Collection(null);

// Add an error to the collection
throwError = function(message) {
    Errors.insert({message: message});
}
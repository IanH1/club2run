// Create the collection
MessageBoard = new Mongo.Collection("message_board");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Create and insert a new message board.
         *
         * @param   fixtureId - the message board fixture
         * @param   clubId - the current club
         *
         * @return  The id of the inserted message board
         */
        createAndInsertMessageBoard: function(fixtureId, clubId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Create the new message board
            var messageBoard = {
                fixtureId: fixtureId,
                clubId: clubId,
                createdOn: new Date(),
                createdBy: Meteor.userId(),
                modifiedOn: new Date(),
                modifiedBy: Meteor.userId()
            };

            // Check if the message board is valid
            check(messageBoard, Schema.MessageBoard);

            // Insert the new message
            var messageBoardId = MessageBoard.insert(messageBoard);

            return { _id: messageBoardId };
        },

        /*
         * Insert a new message onto the message board.
         *
         * @param   message - the message content to insert
         * @param   messageBoard - the target message board
         */
        insertMessage: function(message, messageBoard) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["user"], messageBoard.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Update the message board
            MessageBoard.update({ _id: messageBoard._id }, { $push: { messages: { message: message, createdOn: new Date(), createdBy: Meteor.userId() }}});
        },

        /*
         * Delete a message board.
         *
         * @param   messageBoard - the message board to delete
         */
        deleteMessageBoard: function(messageBoard) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "team_manager"], messageBoard.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the message board
            MessageBoard.remove(messageBoard._id);
        }
    });
}
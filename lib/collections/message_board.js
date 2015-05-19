// Create the collection
MessageBoard = new Mongo.Collection("message_board");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Create and insert a new message board.
         *
         * @param   eventId -
         *
         * @return  The id of the inserted message board
         */
        createAndInsertMessageBoard: function(eventId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "manager"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            var event = CalendarEvent.findOne(eventId);
            var name = "";
            if (event.type === "fixture") {
                var homeTeam = Team.findOne(event.fixture.homeTeamId);
                var awayTeam = Team.findOne(event.fixture.awayTeamId);
                name = homeTeam.name + " V " + awayTeam.name;
            } else {
                name = "TO DO";
            }

            // Create the new message board
            var messageBoard = {
                name: name,
                eventId: eventId,
                clubId: Meteor.user().profile.currentClubId,
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
         * @param   message - the message to insert
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
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "manager"], messageBoard.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the message board
            MessageBoard.remove(messageBoard._id);
        }
    });
}
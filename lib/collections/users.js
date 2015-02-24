Meteor.isClient && Meteor.users.after.update(function (userId, user) {

    // Display confirmation message
    FlashMessages.sendSuccess("User successfully updated.");
});
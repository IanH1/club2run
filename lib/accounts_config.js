Meteor.startup(function() {

    Accounts.config({
        forbidClientAccountCreation: true
    });
});
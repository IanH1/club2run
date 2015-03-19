Template.articleCreate.events({
    'click .cancel': function() {
        Router.go("articleList");
    }
});

AutoForm.hooks({
    createArticle: {
        onSubmit: function(insertedArticle) {
            var autoForm = this;
            Meteor.call("insertArticle", insertedArticle, Session.get("currentClub")._id, function(error) {
                if (error) {
                    autoForm.done(error);
                } else {
                    autoForm.done();
                }
            });
            return false;
        },
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("articleList");
        }
    }
});
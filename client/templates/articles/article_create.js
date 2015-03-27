Template.articleCreate.events({
    'click .cancel': function() {
        Router.go("articleList");
    }
});

AutoForm.hooks({
    createArticle: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("articleList");
        }
    }
});
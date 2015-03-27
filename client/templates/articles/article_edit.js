Template.articleEdit.events({
    'click .cancel': function() {
        Router.go("articleList");
    }
});

AutoForm.hooks({
    editArticle: {
        onSuccess: function() {
            FlashMessages.sendSuccess("Successfully saved changes.");
            Router.go("articleList");
        }
    }
});
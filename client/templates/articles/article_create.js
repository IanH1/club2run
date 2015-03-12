Template.articleCreate.events({
    'click .cancel': function() {
        Router.go('articleList');
    }
});

AutoForm.addHooks('createArticle', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go('articleList');
    }
});
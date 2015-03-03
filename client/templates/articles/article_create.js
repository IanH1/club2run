Template.articleCreate.events({
    'click .cancel': function(e, tpl) {
        Router.go('articleList');
    }
});

AutoForm.addHooks('createArticle', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Article successfully created.");
        Router.go('articleList');
    }
});
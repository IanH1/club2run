Template.articleCreate.events({
    'click .cancel': function() {
        Router.go('articleList');
    }
});

AutoForm.addHooks('createArticle', {
    onSuccess: function() {
        Router.go('articleList');
    }
});
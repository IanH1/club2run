Template.articleEdit.events({
    'click .cancel': function() {
        Router.go("articleList");
    }
});

AutoForm.addHooks("editArticle", {
    onSuccess: function() {
        FlashMessages.sendSuccess("Successfully saved changes.");
        Router.go("articleList");
    }
});
Template.articleList.helpers({
    articles: function() {
        return Article.find();
    }
});

Template.articleList.events({
    'click .delete': function() {
        var article = this;
        bootbox.confirm("Are you sure you want to delete this article?", function(result) {
            if (result) {
                Meteor.call("deleteArticle", article, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Article successfully deleted.");
                        Router.go("articleList");
                    }
                });
            }
        });
    }
});
Template.articleEdit.events({
    'click .cancel': function() {
        Router.go('articleList');
    },
    'click .delete': function() {
        var articleId = this._id;
        bootbox.confirm("Are you sure you want to delete this article?", function(result) {
            if (result) {
                Meteor.call('deleteArticle', articleId, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Article successfully deleted.");
                        Router.go('articleList');
                    }
                });
            }
        });
    }
});

AutoForm.addHooks('editArticle', {
    onSuccess: function() {
        Router.go('articleList');
    }
});
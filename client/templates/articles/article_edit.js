Template.articleEdit.events({
    'click .delete': function() {
        var articleId = this._id;
        bootbox.confirm("Are you sure you want to delete this article?", function(result) {
            if (result) {
                Meteor.call('deleteArticle', articleId, function(error, result) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Article successfully deleted.");
                        Router.go('articleList');
                    }
                });
            }
        });
    },
    'click .cancel': function(e, tpl) {
        Router.go('articleList');
    }
});

AutoForm.addHooks('editArticle', {
    onSuccess: function() {
        FlashMessages.sendSuccess("Article successfully updated.");
        Router.go('articleList');
    }
});
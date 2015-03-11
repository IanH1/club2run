Template.articleList.helpers({
    articles: function() {
        return Article.find();
    }
});
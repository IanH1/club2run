Article = new Mongo.Collection('article');

Meteor.methods({
    insertArticle: function(article) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "editor"], Club.findOne())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        article = _.extend(article,
            {clubId: Club.findOne()},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the article is valid
        check(article, Schema.Article);

        // Insert the new article
        var articleId = Article.insert(article);

        return {
            _id: articleId
        };
    },
    updateArticle: function(article, modifier, articleId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "editor"], Club.findOne())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        article = _.extend(article,
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the article is valid
        check(article, Schema.Article);

        // Update the existing article
        Article.update(articleId, {$set: article});
    },
    deleteArticle: function(articleId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "editor"], Club.findOne())) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the article
        Article.remove(articleId);
    }
});
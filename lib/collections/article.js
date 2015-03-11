Article = new Mongo.Collection('article');

Meteor.methods({
    insertArticle: function(article) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "editor"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        article = _.extend(article,
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the article is valid
        check(article, Schema.Article);

        // Insert the new member
        var articleId = Article.insert(article);

        return {
            _id: articleId
        };
    },
    updateArticle: function(article, modifier, articleId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "editor"], Meteor.user().profile.clubId)) {
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
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "editor"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing member
        Article.remove(articleId);
    }
});
Articles = new Mongo.Collection('articles');

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
        check(article, Schema.ArticleSchema);

        // Insert the new member
        var articleId = Articles.insert(article);

        // Add notification
        Meteor.call("insertNotification", {description: "Article created by " + Meteor.user().profile.fullName});

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
        check(article, Schema.ArticleSchema);

        // Update the existing article
        Articles.update(articleId, {$set: article});

        // Add notification
        Meteor.call("insertNotification", {description: "Article updated by " + Meteor.user().profile.fullName});
    },
    deleteArticle: function(articleId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "player", "editor"], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing member
        Articles.remove(articleId);

        // Add notification
        Meteor.call("insertNotification", {description: "Article deleted by " + Meteor.user().profile.fullName});
    }
});
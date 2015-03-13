// Create the collection
Article = new Mongo.Collection('article');

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert a new article.
         */
        insertArticle: function(article) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "editor"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
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

            return { _id: articleId };
        },

        /*
         * Update a article.
         */
        updateArticle: function(article, modifier, articleId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "editor"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            article = _.extend(article,
                {modifiedOn: new Date()},
                {modifiedBy: Meteor.userId()}
            );

            // Check if the article is valid
            check(article, Schema.Article);

            // Update the  article
            Article.update(articleId, { $set: article });
        },

        /*
         * Delete a article.
         */
        deleteArticle: function(articleId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "editor"], Club.find())) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the article
            Article.remove(articleId);
        }
    });
}
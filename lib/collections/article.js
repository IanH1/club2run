// Create the collection
Article = new Mongo.Collection("article");

// Server privileged methods
if (Meteor.isServer) {
    Meteor.methods({

        /*
         * Insert an article.
         *
         * @param   article - the article to insert
         *
         * @return  The id of the inserted article
         */
        insertArticle: function(article) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "editor"], Meteor.user().profile.currentClubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Apply default values
            article = _.extend(article,
                {clubId:  Meteor.user().profile.currentClubId},
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
         * Update an article.
         *
         * @param   article - the article to update
         * @param   modifier - modifier generated from the form values
         * @param   articleId - the article id
         */
        updateArticle: function(article, modifier, articleId) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "editor"], article.clubId)) {
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
         * Delete an article.
         *
         * @param   article - the article to delete
         */
        deleteArticle: function(article) {

            // Check permissions
            if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ["admin", "editor"], article.clubId)) {
                throw new Meteor.Error(403, "Access denied");
            }

            // Delete the article
            Article.remove(article._id);
        }
    });
}
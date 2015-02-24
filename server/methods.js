Meteor.methods({
    'uploadFile': function(fileId, filename) {
        if (this.userId) {
            var userId = this.userId;
            var clubId = Meteor.users.findOne(this.userId).profile.clubId;

            if (clubId && Roles.userIsInRole(this.userId, ['club_admin'], Roles.GLOBAL_GROUP)) {
                var fs = Meteor.npmRequire('fs');

                Meteor.setTimeout(function () {
                    var filepath = './uploads/uploads-' + fileId + '-' + filename;

                    CSV().from.stream(fs.createReadStream(filepath),
                        {'escape': '\\'})
                        .on('record', Meteor.bindEnvironment(function (row, index) {

                            // Add the new member document
                            Members.insert({
                                firstName: row[0],
                                lastName: row[1],
                                email: row[2],
                                clubId: clubId,
                                createdOn: new Date,
                                createdBy: userId,
                                modifiedOn: new Date,
                                modifiedBy: userId
                            });

                        }, function (error) {
                            console.log(error);
                        }))
                        .on('error', function (error) {
                            console.log(error);
                        })
                        .on('end', function (count) {
                        })

                }, 1000)

            }
        }
    }
});
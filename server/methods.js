Meteor.methods({
    sendEmail: function(doc) {

        // Important server-side check for security and data integrity
        //check(doc, Schema.contact);
        this.unblock();

        var options = {
            apiKey: 'key-5a73f6fcbe8f3385087d841c667880a1',
            domain: 'mg.club2run.com'
        }
        var Emailer = new Mailgun(options);
        Emailer.send({
            'to': 'davidmulligan@btopenworld.com',
            'from': 'no-reply@club2run.com',
            'html': '<html><head></head><body>' + doc.message + '</body></html>',
            'text': doc.message,
            'subject': doc.subject,
            'tags': [
                'some',
                'test',
                'tags'
            ]
        });
    },
    uploadFile: function(fileId, filename) {
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
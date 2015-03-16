Template.userUpload.created = function() {
    this.uploadResult = new ReactiveVar();
};

Template.userUpload.helpers({
    uploadResult: function() {
        return Template.instance().uploadResult.get();
    }
});

Template.userUpload.events({
    'click .upload': function(event, template) {
        var fileInput = template.find('input[type=file]');
        if (fileInput.files.length === 0) {
            bootbox.alert("Please select a file.");
        } else {
            Papa.parse(fileInput.files[0], {
                complete: function(results) {
                    template.uploadResult.set(results.data.map(function(item, index) {
                        item.id = index;
                        return item;
                    }));
                }
            });
        }
    },
    'click .import': function(e, template) {
        var selected = template.findAll("input[type=checkbox]:checked");
        var userArray = _.map(selected, function(item) {
            return Template.instance().uploadResult.get()[item.defaultValue];
        });

        if (userArray.length > 0) {
            _.each(userArray, function(item) {

                // Construct a user object
                var user = {
                    profile: { firstName: item[0], lastName: item[1] },
                    emails: [{ address: item[2], verified: false }]
                };

                // Insert each user
                Meteor.call("insertUser", user, Session.get("currentClub")._id, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    }
                });
            });
        }
        FlashMessages.sendSuccess("Successfully imported " + userArray.length + " users.");
        Router.go('userList');
    },
    'click .cancel': function() {
        Router.go('userList');
    }
});
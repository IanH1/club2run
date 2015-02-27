Template.memberUpload.created = function() {
    this.importResult = new ReactiveVar();
};

Template.memberUpload.helpers({
    importResult: function() {
        return Template.instance().importResult.get();
    }
});

Template.memberUpload.events({
    'click .upload': function(event, template) {
        var fileInput = template.find('input[type=file]');
        if (fileInput.files.length === 0) {
            bootbox.alert("Please select a file.");
        } else {
            Papa.parse(fileInput.files[0], {
                complete: function(results) {
                    template.importResult.set(results.data.map(function(item, index) {
                        item.id = index;
                        return item;
                    }));
                }
            });
        }
    },
    'click .import': function(e, template) {
        var selected = template.findAll("input[type=checkbox]:checked");
        var memberArray = _.map(selected, function(item) {
            return Template.instance().importResult.get()[item.defaultValue];
        });
        if (memberArray.length > 0) {
            Meteor.call('insertMembers', memberArray, function(error) {
                if (error) {
                    FlashMessages.sendError(error.reason);
                } else {
                    FlashMessages.sendSuccess("Successfully imported " + memberArray.length + " members.");
                    Router.go('memberList');
                }
            });
        }
    },
    'click .cancel': function() {
        Router.go('memberList');
    }
});
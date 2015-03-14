Template.officialList.helpers({
    officials: function() {
        return Official.find();
    }
});

Template.officialList.events({
    'click .delete': function() {
        var official = this;
        bootbox.confirm("Are you sure you want to delete this official?", function(result) {
            if (result) {
                Meteor.call('deleteOfficial', official, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Official successfully deleted.");
                        Router.go('officialList');
                    }
                });
            }
        });
    }
});
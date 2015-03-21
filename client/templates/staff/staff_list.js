Template.staffList.helpers({
    staff: function() {
        return Staff.find();
    }
});

Template.staffList.events({
    'click .delete': function() {
        var staff = this;
        bootbox.confirm("Are you sure you want to delete this member of staff?", function(result) {
            if (result) {
                Meteor.call('deleteStaff', staff, function(error) {
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess("Staff successfully deleted.");
                        Router.go('staffList');
                    }
                });
            }
        });
    }
});
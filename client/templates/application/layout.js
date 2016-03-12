Template.layout.rendered = function() {
    $('body').addClass('skin-blue');
};

Template.navigationMenu.helpers({
    online: function() {
        if (Meteor.user().status) {
            return Meteor.user().status.online;
        } else {
            return false;
        }
    },
    clubs: function() {
        return Club.find({ _id: {$in: _.pluck(Meteor.user().profile.memberships, 'clubId')}});
    }
});

Template.navigationMenu.events({
    'click .select-club': function() {
        Meteor.call('updateUserCurrentClub', this, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            } else {
                FlashMessages.sendSuccess("You have successfully selected this club.");
            }
        });
        Meteor.subscribe("club", this._id);
    },
    'click .treeview': function(e) {
        var target = $(e.target).is("li.treeview") ? target : $(e.target).closest("li");
        if (target.hasClass('active')) {
            target.removeClass('active');
        } else {
            target.addClass('active');
        }
    }
});
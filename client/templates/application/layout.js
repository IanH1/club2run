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
        return Club.find({ _id: {$in: Meteor.user().profile.clubIds }});
    }
});

Template.navigationMenu.events({
    'click .select-club': function() {
        Meteor.call('updateUserCurrentClub', Meteor.user(), this, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            } else {
                FlashMessages.sendSuccess("You have successfully updated this club.");
            }
        });
        Meteor.subscribe("club", this._id);
        Session.set("currentClub", this);
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
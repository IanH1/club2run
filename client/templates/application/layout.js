Template.layout.rendered = function(){
    $('body').addClass('skin-blue');
}

Template.errorsWidget.helpers({
    errors: function() {
        return Errors.find();
    }
});

Template.errorWidget.rendered = function() {
    var error = this.data;
    Meteor.setTimeout(function () {
        Errors.remove(error._id);
    }, 3000);
};

Template.navigationMenu.helpers({
    online: function() {
        if (Meteor.user().status) {
            return Meteor.user().status.online;
        } else {
            return false;
        }
    }
});

Template.navigationMenu.events({
    'click .treeview': function(e) {
        var target = $(e.target).is("li.treeview") ? target : $(e.target).closest("li");
        if (target.hasClass('active')) {
            target.removeClass('active');
        } else {
            target.addClass('active');
        }
    }
});
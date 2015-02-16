Template.layout.rendered = function(){
    $('body').addClass('skin-blue');
}

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
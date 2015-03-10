Template.taskDropdown.helpers({
    tasks: function() {
        return Tasks.find({complete: {$ne: true}});
    }
});
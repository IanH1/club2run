Template.home.helpers({
    notificationCount: function(){
        return Notifications.find({read: {$ne: true}}).count();
    },
    taskCount: function(){
        return Tasks.find({complete: {$ne: true}}).count();
    }
});
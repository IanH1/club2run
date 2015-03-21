Template.eventList.created = function() {
    this.eventType = new ReactiveVar();
    this.eventType.set('fixture');
};

Template.eventList.helpers({
    eventType: function() {
        return Template.instance().eventType.get();
    }
});

Template.eventList.events({
    'click .fixture': function(event, template) {
        template.eventType.set('fixture');
    },
    'click .meeting': function(event, template) {
        template.eventType.set('meeting');
    },
    'click .training': function(event, template) {
        template.eventType.set('training');
    }
});
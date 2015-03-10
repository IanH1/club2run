Template.eventList.rendered = function() {
    var fc = this.$('.fc');
    this.autorun(function() {
        Events.find();
        fc.fullCalendar('refetchEvents');
    });
};

Template.eventList.helpers({
    matches: function() {
        return Events.find({type: "Match"});
    },
    team: function() {
        return Teams.findOne(this.match.teamId);
    }
});

Template.eventList.events({
});
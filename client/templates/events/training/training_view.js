Template.trainingViewModal.helpers({
    training: function() {
        if (Session.get("showEventId")) {
            return Training.findOne(Session.get("showEventId"));
        }
    },
    team: function() {
        if (Session.get("showEventId")) {
            var training = Training.findOne(Session.get("showEventId"));
            if (training && training.teamId) {
                return Team.findOne(training.teamId);
            }
        }
    },
    coach: function() {
        if (this.valueOf()) {
            return Staff.findOne(this.valueOf());
        }
    }
});

Template.trainingViewModal.events({
    'click [data-dismiss="modal"]': function() {
        Session.set('showEventId', null);
        Session.set('showEventType', null);
        Session.set('showEventModal', false);
    }
});
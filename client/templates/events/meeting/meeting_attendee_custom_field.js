Template.afObjectField_meetingAttendeeCustomObjectField.helpers({
    userIdFieldName: function() {
        return this.atts.name + '.userId'
    },
    availabilityFieldName: function() {
        return this.atts.name + '.availability'
    }
});
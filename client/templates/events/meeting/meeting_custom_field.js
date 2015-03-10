Template.afObjectField_meetingCustomObjectField.helpers({
    memberIdFieldName: function() {
        return this.atts.name + '.memberId'
    },
    statusFieldName: function() {
        return this.atts.name + '.status'
    }
});
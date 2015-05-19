Template.afObjectField_playersCustomObjectField.helpers({
    squadNumberFieldName: function() {
        return this.atts.name + '.squadNumber'
    },
    positionFieldName: function() {
        return this.atts.name + '.position'
    },
    userIdFieldName: function() {
        return this.atts.name + '.userId'
    }
});
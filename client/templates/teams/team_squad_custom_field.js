Template.afObjectField_squadCustomObjectField.helpers({
    squadNumberFieldName: function() {
        return this.atts.name + '.squadNumber'
    },
    userIdFieldName: function() {
        return this.atts.name + '.userId'
    },
    positionFieldName: function() {
        return this.atts.name + '.position'
    }
});
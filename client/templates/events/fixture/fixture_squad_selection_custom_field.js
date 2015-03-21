Template.afObjectField_squadSelectionCustomObjectField.helpers({
    squadNumberFieldName: function() {
        return this.atts.name + '.squadNumber'
    },
    userIdFieldName: function() {
        return this.atts.name + '.userId'
    },
    positionFieldName: function() {
        return this.atts.name + '.position'
    },
    availabilityFieldName: function() {
        return this.atts.name + '.availability'
    }
});
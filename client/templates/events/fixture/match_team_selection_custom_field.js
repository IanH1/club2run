Template.afObjectField_matchCustomObjectField.helpers({
    playerIdFieldName: function() {
        return this.atts.name + '.playerId'
    },
    positionFieldName: function() {
        return this.atts.name + '.position'
    },
    availabilityFieldName: function() {
        return this.atts.name + '.availability'
    }
});
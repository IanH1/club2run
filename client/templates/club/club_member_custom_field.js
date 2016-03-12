Template.afObjectField_memberCustomObjectField.helpers({
    memberTypeFieldName: function() {
        return this.atts.name + '.type'
    },
    memberFeeFieldName: function() {
        return this.atts.name + '.fee'
    }
});
Template.afObjectField_membershipCustomObjectField.helpers({
    membershipClubFieldName: function() {
        return  'profile.memberships.0.clubId'
		}, 
		membershipTypeFieldName: function() {
      return  'profile.memberships.0.memType'
    },
    membershipStatusFieldName: function() {
        return 'profile.memberships.0.status'
		}, 
    membershipEndDateName: function() {
        return 'profile.memberships.0.endDate'
		}
});
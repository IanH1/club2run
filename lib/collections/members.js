Members = new Mongo.Collection('members');

Meteor.methods({
    insertMember: function(member) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Apply default values
        var fullName = member.firstName + " " + member.lastName;
        member = _.extend(member,
            {fullName: fullName},
            {clubId: Meteor.user().profile.clubId},
            {createdOn: new Date()},
            {createdBy: Meteor.userId()},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the member is valid
        check(member, Schema.MemberSchema);

        // Insert the new member
        var memberId = Members.insert(member);

        // Add notification
        //Meteor.call("insertNotification", {description: "Member created by " + Meteor.user().profile.fullName, link: 'memberEdit', linkId: memberId});

        return {
            _id: memberId
        };
    },
    insertMembers: function(memberArray) {
        _.each(memberArray, function(member) {
            Meteor.call("insertMember", {firstName: member[0], lastName: member[1], email: member[2]});
        });
    },
    updateMember: function(member, modifier, memberId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        console.log(Meteor.user().profile.clubId);

        // Apply default values
        var fullName = member.firstName + " " + member.lastName;
        member = _.extend(member,
            {fullName: fullName},
            {modifiedOn: new Date()},
            {modifiedBy: Meteor.userId()}
        );

        // Check if the member is valid
        check(member, Schema.MemberSchema);

        // Update the existing member
        Members.update(memberId, {$set: member});

        // Add notification
        Meteor.call("insertNotification", {description: "Member updated by " + Meteor.user().profile.fullName, link: 'memberEdit', linkId: memberId});
    },
    deleteMember: function(memberId) {

        // Check user permissions
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'], Meteor.user().profile.clubId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        // Delete the existing member
        Members.remove(memberId);

        // Add notification
        Meteor.call("insertNotification", {description: "Member deleted by " + Meteor.user().profile.fullName});
    }
});
var cssStatusClass = function(status) {
    if (status === "Accepted") {
        return "primary";
    } else if (status === "Tentative") {
        return "warning";
    } else if (status === "Declined") {
        return "danger";
    } else {
        return "default";
    }
};

Template.meetingView.helpers({
    member: function() {
        if (this.memberId) {
            return Members.findOne(this.memberId);
        }
    },
    invite: function() {
        var member = Members.findOne({userId: Meteor.userId()});
        if (member && this.meeting && this.meeting.invitees) {
            return _.find(this.meeting.invitees, function (invite) {
                if (invite.memberId === member._id) {
                    return invite;
                }
            });
        }
    },
    inviteeStatusClass: function() {
        return cssStatusClass(this.status)
    },
    inviteStatusClass: function() {
        var member = Members.findOne({userId: Meteor.userId()});
        if (member && this.meeting && this.meeting.invitees) {
            var invite = _.find(this.meeting.invitees, function (invite) {
                if (invite.memberId === member._id) {
                    return invite;
                }
            });
            return cssStatusClass(invite.status);
        }
    }
});

Template.meetingView.events({
    'click .event-edit': function() {
        Router.go("eventEdit", {_id: this._id});
    },
    'click .event-accept': function() {
        var memberId = Members.findOne({userId: Meteor.userId()})._id;
        Meteor.call('updateEventInvite', this._id, memberId, 'Accepted', function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    },
    'click .event-tenative': function() {
        var memberId = Members.findOne({userId: Meteor.userId()})._id;
        Meteor.call('updateEventInvite', this._id, memberId, 'Tentative', function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    },
    'click .event-decline': function() {
        var memberId = Members.findOne({userId: Meteor.userId()})._id;
        Meteor.call('updateEventInvite', this._id, memberId, 'Declined', function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            }
        });
    }
});
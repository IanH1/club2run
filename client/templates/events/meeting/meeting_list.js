Template.meetingList.helpers({
    meetings: function() {
        return Meeting.find();
    }
});
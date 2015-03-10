var messages = function() {
    return Messages.find({}, {sort: {createdOn: -1}});
};



Template.messageDropdown.helpers({
    messages: messages
});
Template.memberUpload.events({
    'change .uploadFile' : function(evt, tmpl) {
        FS.Utility.eachFile(event, function(file) {
           Uploads.insert(new FS.File(file), function(error, fileObj) {
               if (!error) {

                   // Upload the members
                   Meteor.call('uploadFile', fileObj._id, file.name, function(err, data) {
                       if (!err) {

                           // Display confirmation message
                           FlashMessages.sendSuccess("Members successfully uploaded.");
                       }
                   });

                   Router.go('memberList');
               } else {
                   FlashMessages.sendError("Failed to upload file : " + file.name);
               }
           })
       })
    },
    'click .cancel': function(e, tpl) {
        Router.go('memberList');
    }
});
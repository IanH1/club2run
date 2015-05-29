Meteor.UtilFunctions = {

    cssAvailabilityClass: function(availability) {
        if (availability === "Accepted" || availability === "Available") {
            return "primary";
        } else if (availability === "Tentative") {
            return "warning";
        } else if (availability === "Declined" || availability === "Unavailable") {
            return "danger";
        } else {
            return "default";
        }
    },

    eventColour: function(eventType) {
        if (eventType === "meeting") {
            return "#FF7373";
        } else if (eventType === "club") {
            return "#B300B3";
        } else if (eventType === "fixture") {
            return "#7CEB98";
        } else if (eventType === "training") {
            return "#FF9C42";
        } else if (eventType === "") {
            return null;
        }
    }
};
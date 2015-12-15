Router.configure({
    layoutTemplate: "layout",
    notFoundTemplate: "notFound",
    waitOn: function() {
        if (Meteor.user() && Meteor.user().profile) {
            Meteor.subscribe("clubsForUser");
            Meteor.subscribe("calendarEventsForUser");
            if (Meteor.user().profile.currentClubId) {
                Meteor.subscribe("club", Meteor.user().profile.currentClubId);
                Meteor.subscribe("profilePictures");
                Meteor.subscribe("userStatus");
            }
        }
        return []
    }
});

// Home
Router.route("/", {
    name: "home",
    title: "Home"
});

// Admin Dashboard
Router.route("/dashboard", {
    name: "dashboard",
    title: "Admin Dashboard"
});

// Accounts
Router.route("/profile", {
    name: "profile",
    title: "Profile",
    parent: "home"
});

// Articles
Router.route("/articles", {
    name: "articleList",
    title: "News",
    parent: "home"
});
Router.route("/articles/create", {
    name: "articleCreate",
    title: "Create",
    parent: "articleList"
});
Router.route("/articles/edit/:_id", {
    name: "articleEdit",
    title: "Edit",
    parent: "articleList",
    data: function() {
        return Article.findOne(this.params._id);
    }
});

// Club
Router.route("/club/edit", {
    name: "clubEdit",
    title: "Update Club",
    parent: "home"
});
Router.route("/club/join", {
    name: "clubJoin",
    title: "Join a Club",
    parent: "home",
    waitOn: function() {
        return [Meteor.subscribe("clubs")];
    }
});

// Events
Router.route("/events", {
    name: "eventList",
    title: "Events",
    parent: "home"
});
Router.route("/events/create/:eventType?", {
    name: "eventCreate",
    title: "Create",
    parent: "eventList",
    waitOn: function() {
        Session.set('eventType', this.params.eventType);
    }
});
Router.route("/events/edit/:_id", {
    name: "eventEdit",
    title: "Edit",
    parent: "eventList",
    data: function() {
        return CalendarEvent.findOne(this.params._id);
    }
});

// Fixtures
Router.route("/fixtures/result/:_id", {
    name: "fixtureResult",
    title: "Result",
    parent: "eventList",
    data: function() {
        return CalendarEvent.findOne(this.params._id);
    }
});
Router.route("/fixtures/report/:_id", {
    name: "fixtureReport",
    title: "Report",
    parent: "eventList",
    data: function() {
        return Article.findOne(this.params._id);
    }
});

// Officials
Router.route("/officials", {
    name: "officialList",
    title: "Officials",
    parent: "home"
});
Router.route("/officials/create", {
    name: "officialCreate",
    title: "Create",
    parent: "officialList"
});
Router.route("/officials/edit/:_id", {
    name: "officialEdit",
    title: "Edit",
    parent: "officialList",
    data: function() {
        return Official.findOne(this.params._id);
    }
});

// Staff
Router.route("/staff", {
    name: "staffList",
    title: "Staff",
    parent: "home"
});
Router.route("/staff/create", {
    name: "staffCreate",
    title: "Create",
    parent: "staffList"
});
Router.route("/staff/edit/:_id", {
    name: "staffEdit",
    title: "Edit",
    parent: "staffList",
    data: function() {
        return Staff.findOne(this.params._id);
    }
});

// Teams
Router.route("/teams", {
    name: "teamList",
    title: "Teams",
    parent: "home"
});
Router.route("/teams/create", {
    name: "teamCreate",
    title: "Create",
    parent: "teamList"
});
Router.route("/teams/edit/:_id", {
    name: "teamEdit",
    title: "Edit",
    parent: "teamList",
    data: function() {
        return Team.findOne(this.params._id);
    }
});

// Users
Router.route("/users", {
    name: "userList",
    title: "Users",
    parent: "home"
});
Router.route("/users/create", {
    name: "userCreate",
    title: "Create",
    parent: "userList"
});
Router.route("/users/edit/:_id", {
    name: "userEdit",
    title: "Edit",
    parent: "userList",
    data: function() {
        return Meteor.users.findOne(this.params._id);
    }
});
Router.route("/users/upload", {
    name: "userUpload",
    title: "Upload",
    parent: "userList"
});
Router.route("/users/email/:_id", {
    name: "userEmail",
    title: "Email",
    parent: "userList",
    data: function() {
        return Meteor.users.findOne(this.params._id);
    }
});

var requireLogin = function() {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.render("landingPage");
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {except: ["landingPage"]});
//Router.onBeforeAction("dataNotFound");
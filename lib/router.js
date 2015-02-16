Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

BaseController = RouteController.extend({
    onBeforeAction: function() {
        Session.set("collectionObject", null);
        Session.set("collectionMode", null);
        this.next();
    }
});

// Dashboard
Router.route('/', {
    name: 'home',
    onBeforeAction: function() {
        Session.set("collectionObject", null);
        Session.set("collectionMode", null);
        this.next();
    }
});

// Accounts
Router.route('/profile', {
    name: 'profile',
    onBeforeAction: function() {
        Session.set("collectionObject", null);
        Session.set("collectionMode", null);
        this.next();
    }
});

// Club
Router.route('/club', {
    name: 'club',
    controller: 'BaseController'
});
Router.route('/club/edit', {
    name: 'clubEdit',
    controller: 'BaseController'
});

// Members
Router.route('/members', {
    name: 'memberList',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.member);
        Session.set("collectionMode", "list");
    }
});
Router.route('/members/create', {
    name: 'memberCreate',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.member);
        Session.set("collectionMode", "create");
    }
});
Router.route('/members/edit/:_id', {
    name: 'memberEdit',
    controller: 'BaseController',
    data: function() {
        return Members.findOne(this.params._id);
    },
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.member);
        Session.set("collectionMode", "edit");
    }
});

// Teams
Router.route('/teams', {
    name: 'teamList',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.team);
        Session.set("collectionMode", "list");
    }
});
Router.route('/teams/create', {
    name: 'teamCreate',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.team);
        Session.set("collectionMode", "create");
    }
});
Router.route('/teams/edit/:_id', {
    name: 'teamEdit',
    controller: 'BaseController',
    data: function() {
        return Teams.findOne(this.params._id);
    },
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.team);
        Session.set("collectionMode", "edit");
    }
});

// Matches
Router.route('/matches', {
    name: 'matchList',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.match);
        Session.set("collectionMode", "list");
    }
});
Router.route('/matches/create', {
    name: 'matchCreate',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.match);
        Session.set("collectionMode", "create");
    }
});
Router.route('/matches/edit/:_id', {
    name: 'matchEdit',
    controller: 'BaseController',
    data: function() {
        return Matches.findOne(this.params._id);
    },
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.match);
        Session.set("collectionMode", "edit");
    }
});

// Officals
Router.route('/officals', {
    name: 'officalList',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.offical);
        Session.set("collectionMode", "list");
    }
});
Router.route('/officals/create', {
    name: 'officalCreate',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.offical);
        Session.set("collectionMode", "create");
    }
});
Router.route('/officals/edit/:_id', {
    name: 'officalEdit',
    controller: 'BaseController',
    data: function() {
        return Officals.findOne(this.params._id);
    },
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.offical);
        Session.set("collectionMode", "edit");
    }
});

// Staff
Router.route('/staff', {
    name: 'staffList',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.staff);
        Session.set("collectionMode", "list");
    }
});
Router.route('/staff/create', {
    name: 'staffCreate',
    controller: 'BaseController',
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.staff);
        Session.set("collectionMode", "create");
    }
});
Router.route('/staff/edit/:_id', {
    name: 'staffEdit',
    controller: 'BaseController',
    data: function() {
        return Staff.findOne(this.params._id);
    },
    onAfterAction: function() {
        Session.set("collectionObject", collectionItems.staff);
        Session.set("collectionMode", "edit");
    }
});

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('landingPage');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {except: ['landingPage']});
Router.onBeforeAction('loading');
Router.onBeforeAction('dataNotFound', {only: 'memberPage'});
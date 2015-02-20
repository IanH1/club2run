Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [
            Meteor.subscribe('profilePictures'),
            Meteor.subscribe('club'),
            Meteor.subscribe('messages'),
            Meteor.subscribe('notifications'),
            Meteor.subscribe('tasks'),
            Meteor.subscribe('userStatus')
        ]
    }
});

// Dashboard
Router.route('/', {
    name: 'home',
    title: 'Home'
});

// Accounts
Router.route('/profile', {
    name: 'profile',
    title: 'Profile',
    parent: 'home'
});

// Club
Router.route('/club', {
    name: 'club',
    title: 'Club',
    parent: 'home'
});
Router.route('/club/edit', {
    name: 'clubEdit',
    title: 'Edit',
    parent: 'club'
});

// Members
Router.route('/members', {
    name: 'memberList',
    title: 'Members',
    parent: 'home',
    waitOn: function() {
        return Meteor.subscribe('members')
    }
});
Router.route('/members/create', {
    name: 'memberCreate',
    title: 'Create',
    parent: 'memberList',
    waitOn: function() {
        return Meteor.subscribe('members')
    }
});
Router.route('/members/edit/:_id', {
    name: 'memberEdit',
    title: 'Edit',
    parent: 'memberList',
    data: function() {
        return Members.findOne(this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('members')
    }
});

// Teams
Router.route('/teams', {
    name: 'teamList',
    title: 'Teams',
    parent: 'home',
    waitOn: function() {
        return Meteor.subscribe('teams')
    }
});
Router.route('/teams/create', {
    name: 'teamCreate',
    title: 'Create',
    parent: 'teamList',
    waitOn: function() {
        return Meteor.subscribe('teams')
    }
});
Router.route('/teams/edit/:_id', {
    name: 'teamEdit',
    title: 'Edit',
    parent: 'teamList',
    data: function() {
        return Teams.findOne(this.params._id);
    },
    waitOn: function() {
        return [Meteor.subscribe('teams'), Meteor.subscribe('members'), Meteor.subscribe('staff')]
    }
});

// Matches
Router.route('/matches', {
    name: 'matchList',
    title: 'Matches',
    parent: 'home',
    waitOn: function() {
        return Meteor.subscribe('matches')
    }
});
Router.route('/matches/create', {
    name: 'matchCreate',
    title: 'Create',
    parent: 'matchList',
    waitOn: function() {
        return Meteor.subscribe('matches')
    }
});
Router.route('/matches/edit/:_id', {
    name: 'matchEdit',
    title: 'Edit',
    parent: 'matchList',
    data: function() {
        return Matches.findOne(this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('matches')
    }
});

// Officials
Router.route('/officials', {
    name: 'officialList',
    title: 'Officials',
    parent: 'home',
    waitOn: function() {
        return Meteor.subscribe('officials')
    }
});
Router.route('/officials/create', {
    name: 'officialCreate',
    title: 'Create',
    parent: 'officialList',
    waitOn: function() {
        return Meteor.subscribe('officials')
    }
});
Router.route('/officials/edit/:_id', {
    name: 'officialEdit',
    title: 'Edit',
    parent: 'officialList',
    data: function() {
        return Officials.findOne(this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('officials')
    }
});

// Staff
Router.route('/staff', {
    name: 'staffList',
    title: 'Staff',
    parent: 'home',
    waitOn: function() {
        return Meteor.subscribe('staff')
    }
});
Router.route('/staff/create', {
    name: 'staffCreate',
    title: 'Create',
    parent: 'staffList',
    waitOn: function() {
        return Meteor.subscribe('staff')
    }
});
Router.route('/staff/edit/:_id', {
    name: 'staffEdit',
    title: 'Edit',
    parent: 'staffList',
    data: function() {
        return Staff.findOne(this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('staff')
    }
});

var requireLogin = function() {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.render('landingPage');
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {except: ['landingPage']});
Router.onBeforeAction('dataNotFound');
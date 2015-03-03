Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.clubId) {
            Meteor.subscribe('club', Meteor.user().profile.clubId);
            Meteor.subscribe('profilePictures');
        Meteor.subscribe('club');
        Meteor.subscribe('events');
        Meteor.subscribe('members');
        Meteor.subscribe('messages');
        Meteor.subscribe('notifications');
        Meteor.subscribe('officials');
        Meteor.subscribe('staff');
        Meteor.subscribe('tasks');
        Meteor.subscribe('teams');
        Meteor.subscribe('articles')
            Meteor.subscribe('userStatus');
        }
        return []
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
    parent: 'home'
});
Router.route('/members/create', {
    name: 'memberCreate',
    title: 'Create',
    parent: 'memberList'
});
Router.route('/members/upload', {
    name: 'memberUpload',
    title: 'Upload',
    parent: 'memberList'
});
Router.route('/members/edit/:_id', {
    name: 'memberEdit',
    title: 'Edit',
    parent: 'memberList',
    data: function() {
        return Members.findOne(this.params._id);
    }
});
Router.route('/members/email/:_id', {
    name: 'memberEmail',
    title: 'Email',
    parent: 'memberList',
    data: function() {
        return Members.findOne(this.params._id);
    }
});

// Teams
Router.route('/teams', {
    name: 'teamList',
    title: 'Teams',
    parent: 'home'
});
Router.route('/teams/create', {
    name: 'teamCreate',
    title: 'Create',
    parent: 'teamList'
});
Router.route('/teams/edit/:_id', {
    name: 'teamEdit',
    title: 'Edit',
    parent: 'teamList',
    data: function() {
        return Teams.findOne(this.params._id);
    }
});

// Events
Router.route('/events', {
    name: 'eventList',
    title: 'Events',
    parent: 'home'
});
Router.route('/events/create/:eventType?', {
    name: 'eventCreate',
    title: 'Create',
    parent: 'eventList',
    waitOn: function() {
        Session.set('eventType', this.params.eventType);
    }
});
Router.route('/events/edit/:_id', {
    name: 'eventEdit',
    title: 'Edit',
    parent: 'eventList',
    data: function() {
        return Events.findOne(this.params._id);
    }
});

// Officials
Router.route('/officials', {
    name: 'officialList',
    title: 'Officials',
    parent: 'home'
});
Router.route('/officials/create', {
    name: 'officialCreate',
    title: 'Create',
    parent: 'officialList'
});
Router.route('/officials/edit/:_id', {
    name: 'officialEdit',
    title: 'Edit',
    parent: 'officialList',
    data: function() {
        return Officials.findOne(this.params._id);
    }
});

// Staff
Router.route('/staff', {
    name: 'staffList',
    title: 'Staff',
    parent: 'home'
});
Router.route('/staff/create', {
    name: 'staffCreate',
    title: 'Create',
    parent: 'staffList'
});
Router.route('/staff/edit/:_id', {
    name: 'staffEdit',
    title: 'Edit',
    parent: 'staffList',
    data: function() {
        return Staff.findOne(this.params._id);
    }
});

var requireLogin = function() {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.render('landingPage');
    } else {
        this.next();
    }
}

// Articles
Router.route('/articles', {
    name: 'articleList',
    title: 'News',
    parent: 'home'
});
Router.route('/articles/create', {
    name: 'articleCreate',
    title: 'Create',
    parent: 'articleList'
});
Router.route('/articles/edit/:_id', {
    name: 'articleEdit',
    title: 'Edit',
    parent: 'articleList',
    data: function() {
        return Articles.findOne(this.params._id);
    }
});


Router.onBeforeAction(requireLogin, {except: ['landingPage']});
//Router.onBeforeAction('dataNotFound');
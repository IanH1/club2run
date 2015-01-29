Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('userData')]
    }
});

Router.route('/', {
    name: 'home'
});

Router.route('/members', {
    name: 'memberList',
    waitOn: function() {
        return [
            Meteor.subscribe('members', {sort: {fullName: 1, _id: -1}})
        ];
    }
});

Router.route('/teams', {
    name: 'teamList',
    waitOn: function() {
        return [
            Meteor.subscribe('teams', {sort: {name: 1, _id: -1}})
        ];
    }
});

Router.route('/events', {
    name: 'eventList',
    waitOn: function() {
        return [
            Meteor.subscribe('events', {sort: {startTime: -1, _id: -1}})
        ];
    }
});

Router.route('/staff', {
    name: 'staffList',
    waitOn: function() {
        return [
            Meteor.subscribe('staff', {sort: {fullName: 1, _id: -1}})
        ];
    }
});

Router.route('/officals', {
    name: 'officalList',
    waitOn: function() {
        return [
            Meteor.subscribe('officals', {sort: {fullName: 1, _id: -1}})
        ];
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
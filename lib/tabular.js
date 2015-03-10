TabularTables = {};

TabularTables.Member = new Tabular.Table({
    name: "memberTable",
    collection: Members,
    columns: [
        {data: "firstName", title: "First Name"},
        {data: "lastName", title: "Last Name"},
        {data: "email", title: "Email"},
        {data: "telephone1", title: "Home Tel"},
        {data: "telephone2", title: "Mobile Tel"},
        {tmpl: Meteor.isClient && Template.memberTableActionButtonCell, width: '50px'}
    ]
});

TabularTables.Event = new Tabular.Table({
    name: "eventTable",
    collection: Events,
    columns: [
        {data: "type", title: "First Name"},

        {tmpl: Meteor.isClient && Template.eventTableActionButtonCell, width: '50px'}
    ]
});

TabularTables.Team = new Tabular.Table({
    name: "teamTable",
    collection: Teams,
    columns: [
        {data: "name", title: "Name"},
        {data: "ageRange", title: "Age Range"},
        {data: "gender", title: "Gender"},
        {tmpl: Meteor.isClient && Template.teamTableActionButtonCell, width: '50px'}
    ]
});

TabularTables.Event = new Tabular.Table({
    name: "eventTable",
    collection: Events,
    columns: [
        {data: "type", title: "Type"},
        {
            data: "startDateTime",
            title: "Start Date/Time",
            render: function (val) {
                if (val instanceof Date) {
                    return moment(val).format('DD/MM/YYYY h:mm');
                } else {
                    return "";
                }
            }
        },
        {tmpl: Meteor.isClient && Template.eventTableActionButtonCell, width: '50px'}
    ]
});

TabularTables.Official = new Tabular.Table({
    name: "officialTable",
    collection: Officials,
    columns: [
        {data: "firstName", title: "First Name"},
        {data: "lastName", title: "Last Name"},
        {data: "gender", title: "Gender"},
        {data: "role", title: "Role"},
        {tmpl: Meteor.isClient && Template.officialTableActionButtonCell, width: '50px'}
    ]
});

TabularTables.Staff = new Tabular.Table({
    name: "staffTable",
    collection: Staff,
    columns: [
        {data: "firstName", title: "First Name"},
        {data: "lastName", title: "Last Name"},
        {data: "gender", title: "Gender"},
        {data: "role", title: "Role"},
        {tmpl: Meteor.isClient && Template.staffTableActionButtonCell, width: '50px'}
    ]
});

TabularTables.Article = new Tabular.Table({
    name: "articleTable",
    collection: Articles,
    columns: [
        {data: "title", title: "Headline"},
        {tmpl: Meteor.isClient && Template.articleTableActionButtonCell, width: '50px'}
    ]
});

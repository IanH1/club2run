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

TabularTables.Match = new Tabular.Table({
    name: "matchTable",
    collection: Matches,
    columns: [
        {data: "team", title: "Team"},
        {data: "opponent", title: "Opponent"},
        {data: "competition", title: "Competition"},
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
        {tmpl: Meteor.isClient && Template.matchTableActionButtonCell, width: '50px'}
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
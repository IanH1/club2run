TabularTables = {};

TabularTables.Member = new Tabular.Table({
    name: "memberTable",
    collection: Members,
    columns: [
        {data: "firstName", title: "First Name"},
        {data: "lastName", title: "Last Name"},
        {data: "email", title: "Email"},
        {data: "telephone1", title: "Telephone 1"},
        {data: "telephone2", title: "Telephone 2"},
        {data: "otherComments", title: "Comments"},
        {tmpl: Meteor.isClient && Template.memberTableUpdateButtonCell},
        {tmpl: Meteor.isClient && Template.memberTableDeleteButtonCell}
    ]
});

TabularTables.Team = new Tabular.Table({
    name: "teamTable",
    collection: Teams,
    columns: [
        {data: "name", title: "Name"},
        {data: "ageRange", title: "Last Name"},
        {data: "sex", title: "Sex"},
        {data: "manager", title: "Manager"},
        {data: "coaches", title: "Coaches"},
        {tmpl: Meteor.isClient && Template.teamTableUpdateButtonCell},
        {tmpl: Meteor.isClient && Template.teamTableDeleteButtonCell}
    ]
});

TabularTables.Staff = new Tabular.Table({
    name: "staffTable",
    collection: Staff,
    columns: [
        {data: "firstName", title: "First Name"},
        {data: "lastName", title: "Last Name"},
        {data: "role", title: "Role"},
        {tmpl: Meteor.isClient && Template.staffTableUpdateButtonCell},
        {tmpl: Meteor.isClient && Template.staffTableDeleteButtonCell}
    ]
});

TabularTables.Offical = new Tabular.Table({
    name: "officalTable",
    collection: Officals,
    columns: [
        {data: "firstName", title: "First Name"},
        {data: "lastName", title: "Last Name"},
        {data: "role", title: "Role"},
        {tmpl: Meteor.isClient && Template.officalTableUpdateButtonCell},
        {tmpl: Meteor.isClient && Template.officalTableDeleteButtonCell}
    ]
});

TabularTables.Event = new Tabular.Table({
    name: "eventTable",
    collection: Events,
    columns: [
        {data: "type", title: "Type"},
        {data: "team", title: "Team"},
        {data: "opponent", title: "Opponent"},
        {data: "competition", title: "Competition"},
        {
            data: "startTime",
            title: "Start Date/Time",
            render: function (val, type, doc) {
                if (val instanceof Date) {
                    return moment(val).format('DD/MM/YYYY h:mm');
                } else {
                    return "";
                }
            }
        },
        {
            data: "endTime",
            title: "End Date/Time",
            render: function (val, type, doc) {
                if (val instanceof Date) {
                    return moment(val).format('DD/MM/YYYY h:mm');
                } else {
                    return "";
                }
            }
        },
        {data: "status", title: "Status"},
        {tmpl: Meteor.isClient && Template.eventTableUpdateButtonCell},
        {tmpl: Meteor.isClient && Template.eventTableDeleteButtonCell}
    ]
});
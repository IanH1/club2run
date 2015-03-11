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
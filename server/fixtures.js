Meteor.startup(function () {
    // code to run on server at startup

    // clear the data base if the server starts
    Members.remove({});

    var now = new Date().getTime();
  
    Members.insert({
        membershipNumber:1,
        squadNumber:28,
        firstName: 'Eren',
        lastName: 'Humphreys',
        sex:'F',
        DOB:'08/02/2001',
        email:'erenhumphreys8@gmail.com',
        mobileNumber:'07576040020',
        photo:'\erenh.jpg',
        linkedContacts:[{firstName:'Ian',lastName:'Humphreys',email:'ijhumph@gmail.com',mobileNumber:'07968799463'},
                        {firstName:'Hulya',lastName:'Humphreys',email:'hulya@seren-consultants.com',mobileNumber:'07968971328'}],
        addressLine1:'13 Cole Park Gardens',
        addressLine2:'',
        townCity:'Twickenham',
        countyState:'Middlesex',
        country:'UK',
        postCode:'TW1 1JB',
        homeTel:'02082881645',
        dayTel:'02071023326',
        emergencyTel:'02071023326',
        ethinicity:'White/British',
        disabilities:['None'],
        allergies:['None'],
        otherComments:'',
        clubsList:[{clubNumber:1,memberSince:'01/09/2012',feesDueDate:'1/09/2015',feesDue:0,
        level:'A',teamCode:'G14S',motmCount:0,totalAppearances:36,position:'DEF',
        played:12,goals:0,assists:0,cleanSheets:4,
        unavailableDates:['23/09/2014','13/11/2014'],
        inactiveDate:''}],
        submitted: now - 5 * 3600 * 1000
    });

    Members.insert({
        membershipNumber:2,
        squadNumber:27,
        firstName: 'Selin',
        lastName: 'Humphreys',
        sex:'F',
        DOB:'27/03/1998',
        email:'selin.humphreys1@gmail.com',
        mobileNumber:'07576040021',
        photo:'\selinh.jpg',
        linkedContacts:[{firstName:'Ian',lastName:'Humphreys',email:'ijhumph@gmail.com',mobileNumber:'07968799463'},
                        {firstName:'Hulya',lastName:'Humphreys',email:'hulya@seren-consultants.com',mobileNumber:'07968971328'}],
        addressLine1:'13 Cole Park Gardens',
        addressLine2:'',
        townCity:'Twickenham',
        countyState:'Middlesex',
        country:'UK',
        postCode:'TW1 1JB',
        homeTel:'02082881645',
        dayTel:'02071023326',
        emergencyTel:'02071023326',
        ethinicity:'White/British',
        disabilities:['None'],
        allergies:['None'],
        otherComments:'',
        clubsList:[{clubNumber:1,memberSince:'01/09/2009',feesDueDate:'1/09/2015',feesDue:0,
        level:'A',teamCode:'G16',motmCount:2,totalAppearances:68,position:'FWD',
        played:12,goals:10,assists:2,cleanSheets:0,
        unavailableDates:['23/09/2014','13/11/2014'],
        inactiveDate:''}],
        submitted: now - 5 * 3600 * 1000
    });

    Clubs.insert({
        clubNumber:1,
        clubName: 'Sunbury & Walton Hockey Club',
        clubType: 'Hockey',
        associations:['Surrey Hockey Association'],
        clubColours:[0,0,0],
        clubPhoto:'clubHouse.jpg',
        clubEmail:'conrad.ray@sky.com',
        clubURL:'www.swhawks.com',
        clubSecretary:'Conrad Ray',
        linkedContacts:[{firstName:'Ian',lastName:'Humphreys',email:'ijhumph@gmail.com',mobileNumber:'07968799463'},
                        {firstName:'Hulya',lastName:'Humphreys',email:'hulya@seren-consultants.com',mobileNumber:'07968971328'}],
        addressLine1:'The Pavilion, St Pauls Catholic College,',
        addressLine2:' The Ridings, Green Street',
        townCity:'Sunbury-On-Thames',
        countyState:'Surrey',
        country:'UK',
        postCode:'TW16 6NX',
        longLat:'',
        tel:'07740812613',
        eventLocations:[{address:'St Pauls Pitch',longLat:'',directions:'',googleMapURL:''},
                       {address:'Hampton Community College',longLat:'',directions:'',googleMapURL:''}],
        submitted: now - 5 * 3600 * 1000
    });

    Groups.insert({
        clubNumber:1,
        groupNumber:1,
        groupCode:'G16A',
        groupName:'Sunbury and Walton Girls 16 and Under A Squad',
        ageRange:'<17',
        sex:'F',
        coaches:[1,2],
        submitted: now - 5 * 3600 * 1000
    });

    Events.insert({
        clubType:'Hockey',
        eventType:'Match',
        competition:'Friendly',
        eventDate:'01/09/2015',
        eventMeetupTime:'13:00',
        eventStartTime:'13:30',
        teamSize:11,
        eventLocation:{address:'St Pauls Pitch',longLat:'',googleMapURL:''},
        homeCoaches:[1,2], //_IDs from Staff collection
        awayCoaches:[3,4],
        umpires:[1,2], //_IDs from Officials collection
        homeClubNumber: 1,
        homeTeam: 'G14S',
        homeSquad:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],//Mongo _IDs list - these values are just stubs
        awayClubNumber: 102,
        awayTeam: 'G13B',
        awaySquad:[15,16,17,18,19,20,21,22,23,24,25,26,27,28], //Mongo _IDs list - these values are just stubs
        submitted: now - 5 * 3600 * 1000,
        status:'ON'
    });

    Events.insert({
        clubType:'Hockey',
        eventType:'Training',
        eventName:'Girls Under 16 and Under 14 Weekly Training',
        eventDate:'04/09/2015',
        eventMeetupTime:'19:00',
        eventEndTime:'21:00',
        squadSize:25,
        eventLocation:{address:'St Pauls Pitch',longLat:'',googleMapURL:''},
        homeCoaches:[1,2], //_IDs from Staff collection
        squadList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],//Mongo _IDs list - these values are just stubs
        submitted: now - 5 * 3600 * 1000,
        status:'ON'
    });

    Staff.insert({
        clubNumber:1,
        staffNumber:1,
        clubType:'Hockey',
        capacity:'Coach',
        firstName:'Martin',
        secondName:'Buchanan',
        squads:['G14S']
    });

    Officials.insert({
        officialNumber:1,
        clubType:'Hockey',
        capacity:'Umpire',
        firstName:'Peter',
        lastName:'English'
    })
});

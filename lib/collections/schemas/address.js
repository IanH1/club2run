AddressSchema = new SimpleSchema({
    line1: {
        type: String,
        max: 100
    },
    line2: {
        type: String,
        max: 100,
        optional: true
    },
    city: {
        type: String,
        max: 100
    },
    county: {
        type: String,
        max: 100,
        optional: true
    },
    postCode: {
        type: String,
        max: 10
    },
    country: {
        type: String,
        max: 100
    },
    longitude: {
        type: String,
        max: 10,
        optional: true
    },
    latitude: {
        type: String,
        max: 10,
        optional: true
    }
});
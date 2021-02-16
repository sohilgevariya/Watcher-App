var mongoose = require('mongoose');
var vendorSchema = mongoose.Schema({

    vendorRole: {
        type: mongoose.Types.ObjectId,
        ref: "vendorType"
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    mobileNo: {
        type: String
    },
    email: {
        type: String
    },
    societyId: {
        type: String
    },
    flatList: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model("vendor", vendorSchema);
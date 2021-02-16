var mongoose = require('mongoose');
var vendortypeSchema = mongoose.Schema({

    role: {
        type: String
    }
});

module.exports = mongoose.model("vendorType", vendortypeSchema);
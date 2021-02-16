var express = require('express');
var vendortypeSchema = require('../model/vendorType.model');
var vendorSchema = require('../model/vendorData.model');
var router = express.Router();

// ----- Vendor ROle ----
router.post('/addVendorRole', async function(req, res, next) {
    const { role } = req.body;
    try {
        var vendorRole = await new vendortypeSchema({
            role: role
        });

        if(vendorRole != null){
            vendorRole.save();
            res.status(200).json({ IsSuccess: true, Data: vendorRole, Message: "Vendor Role Added"});
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/deleteVendorRole', async function(req, res, next){
    const { id } = req.body;
    try {
        var existVendor = await vendortypeSchema.findByIdAndDelete(id);
        if(existVendor){
            res.status(200).json({ IsSuccess: true, Data: 1, Message: "Delete Successfully!" });
        }else{
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Delete Failed!" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

// --------- Vendor Data -----------
router.post('/addVendorData', async function(req, res, next){
    const { vendorRole, name, address, mobileNo, email, societyId, flatList } = req.body;
    try {
        var existVendor = await vendorSchema.find( {
            mobileNo: mobileNo
        });
        if(existVendor.length == 1){
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Vendor Already Exist" });
        }else{
            var vendordata = await new vendorSchema({
                vendorRole: vendorRole,
                name: name,
                address: address,
                mobileNo: mobileNo,
                email: email,
                societyId: societyId,
                flatList: flatList
            });
    
            if(vendordata != null){
                vendordata.save();
                res.status(200).json({ IsSuccess: true, Data: vendordata, Message: "Vendor Data Added"});
            }
        }
        
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/updateVendorData', async function(req, res, next){
    const{ id, address, mobileNo, email, flatList } = req.body;
    try {
        var existVendor = await vendorSchema.findByIdAndUpdate(id, {
            address: address,
            mobileNo: mobileNo,
            email: email,
            flatList: flatList
        });
        if(existVendor != null){
            res.status(200).json({ IsSuccess: true, Data: 1, Message: "Vendor Data Updated"});
        }else{
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Vendor Data Not Updated"});
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/getAllvendor', async function(req, res, next){
    try {
        var existVendor = await vendorSchema.find();
        
        if(existVendor.length > 0){
            res.status(200).json({ IsSuccess: true, Data: existVendor, Message: 'Data found' });
        }else{
            res.status(200).json({ IsSuccess: false, Data: [], Message: 'Data not found' });
        }
        
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/deleteVendor', async function(req, res, next){
    const { id } = req.body;
    try {
        var existVendor = await vendorSchema.findByIdAndDelete(id);
        if(existVendor){
            res.status(200).json({ IsSuccess: true, Data: 1, Message: "Delete Successfully!" });
        }else{
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Delete Failed!" });
        }
        
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
})

module.exports = router;

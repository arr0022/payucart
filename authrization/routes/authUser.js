const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const VerifyuserMiddleware = require("../middleware/verifyUserMiddleware");
const AuthValidationMiddleware = require("../controllers/authorization")
const addBeneficiary = require("../middleware/addBeneficiary")
const pay = require("../middleware/pay")
const profile = require("../../util/profileMulter");
const ReferAmount = require("../../models/ReferModal");

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post("/createuser",
  VerifyuserMiddleware.hasUserValidCredentialFields,
  VerifyuserMiddleware.createSecretPassword,
  AuthValidationMiddleware.create,
  
);

router.post("/loginuser",
  AuthValidationMiddleware.login,
);
// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get('/getuser', fetchuser,AuthValidationMiddleware.getuser)
router.get('/getbank', fetchuser,AuthValidationMiddleware.getBeneficiary)

router.get('/getwallet', fetchuser,AuthValidationMiddleware.getwallet)
router.post('/getbankbynumber', fetchuser,AuthValidationMiddleware.getBeneficiaryByNo)

// ROUTE 1: Create a Admin using: No login required
router.post("/createadmin",
  VerifyuserMiddleware.hasAdminValidCredentialFields,
  VerifyuserMiddleware.createSecretPassword,
  AuthValidationMiddleware.create,
  
);
router.post("/loginadmin",
  AuthValidationMiddleware.login,
  
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get('/getadmin', 
fetchuser,
AuthValidationMiddleware.getAdmin)


// router.post('/pay',pay.verify,pay.getToken)

router.post('/payorder',fetchuser,AuthValidationMiddleware.getuserfornext,pay.verify,pay.createOrder,pay.getOrderLink)

router.post('/withdrawWalletMoney',fetchuser,AuthValidationMiddleware.getuserfornext,addBeneficiary.authorize, addBeneficiary.verify, addBeneficiary.validateBeneficiary, addBeneficiary.createBeneficiary)
router.post('/withdrawMoney',fetchuser,AuthValidationMiddleware.getuserfornext,addBeneficiary.authorize, addBeneficiary.verify, addBeneficiary.validateBeneficiary, addBeneficiary.PayU)

// router.post('/addwallet', addB.createBeneficiary)

// router.post('/createBeneficiary',addBeneficiary.createBeneficiary)

router.post('/refer',fetchuser,AuthValidationMiddleware.refer)

router.post('/editProfile',fetchuser,AuthValidationMiddleware.editProfile)

router.post('/getReward',fetchuser, AuthValidationMiddleware.reward)

router.post('/getUserPlan',fetchuser, AuthValidationMiddleware.getUserPlan)

router.get("/fetchReferText",fetchuser, async (req, res) => {
  try {
    console.log("fetchReferText")
    // let result = await ReferAmount.create({ refer: 5 });
    const refervalue = await ReferAmount.find();
    let data = {};

    refervalue.map((x, n) => {
      if (n === 0) {
        data = {
          referAmt: x.refer
        };
      }
    });
    console.log(typeof(data.referAmt),"here")
    // data = await `Invite friends and get a amount of Rs for each Refer in wallet`
    data = `Invite friends and get Rs ${data.referAmt} for each referral in Wallet`
    res.status(200).json({data});
  } catch (error) {
    res.status(500).json({ error });
  }
});


module.exports = router

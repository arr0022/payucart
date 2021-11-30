const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const VerifyuserMiddleware = require("../middleware/verify.user.middleware");
const AuthValidationMiddleware = require("../controllers/authorization")
const addBeneficiary = require("../middleware/addBeneficiary")
const pay = require("../middleware/pay")
const profile = require("../../util/profileMulter");

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

module.exports = router

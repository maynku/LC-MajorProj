const express=require('express');
const Problem = require('../models/problem');
const ProblemRouter=express.Router();
const adminMiddleware=require('../middleware/adminMiddleware');
const{createProblem}=require('../controllers/UserProblem')



//create admin acess
ProblemRouter.post("/create",adminMiddleware,createProblem);
// //update admin acess only
// ProblemRouter.patch  ("/update/:id",adminMiddleware,updateProblem);
// //delete admin acess only
// ProblemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);


// //fetch
// ProblemRouter.get("/",getallProblem);
// ProblemRouter.get("/:id",getProblembyid);
// ProblemRouter.get("/user",solvedAllProblemByuser);

module.exports=ProblemRouter;
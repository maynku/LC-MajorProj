const express=require('express');
const Problem = require('../models/problem');
const prolemRouter=express.Router();


//create admin acess
ProblemRouter.post("/create",createProblem);
//update admin acess only
ProblemRouter.patch  ("/update/:id",updateProblem);
//delete admin acess only
ProblemRouter.delete("/delete/:id",deleteProblem);


//fetch
ProblemRouter.get("/",fetchProblem);
ProblemRouter.get("/:id",fetchallProblem);
prolemRouter.get("/user",fetchProblemByuser);


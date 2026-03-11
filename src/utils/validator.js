const validate=require('validator');

const validator=(data)=>{
    const manadatoryField=['firstName','lastName','emailId','password'];
    const IsAllowed=manadatoryField.every((k)=>Object.keys(data).includes(k));
    if(!IsAllowed){
        throw new Error("missing manadatory field");
    }
    if(validator.isEmail(data.emailId)){
        throw new Error("invalid email id");
    }
    if(validator.isStrongPassword(data.password)){
        throw new Error("password is not strong");
    }
    

}

module.exports=validate;

import { check,ValidationChain,validationResult } from "express-validator";

export default class Validation{

    // Private Method
    private emailValidation():ValidationChain{
        return check('email').isEmail().withMessage("Invalid Email Id");
    }
    
    private passwordValidation=(): ValidationChain=>{
        return check("password").isLength({min:5}).withMessage("must be at least 5 char long")
    }

    private fullNameValidation():ValidationChain{
        return check('fullName').custom((value)=>{
            //console.log(value.constructor);
            if(typeof(value)==="string"){
                let _fullName=<string>value;
                //console.log(_fullName);
                if(_fullName.length<=4){
                    return false;
                }
            }
    
            return true;
        })
        .withMessage("must be at least 5 char long");
    }

    // Public Method
    public Validate():ValidationChain[]{
        let validationChainArray:Array<ValidationChain>=new Array();
        validationChainArray.push(this.emailValidation(),this.passwordValidation(),this.fullNameValidation());

        return validationChainArray;
    }
}
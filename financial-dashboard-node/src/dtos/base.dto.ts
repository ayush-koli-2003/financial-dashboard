import { validate } from "class-validator";

export class BaseDto{
    static async validate<T extends object>(dto:T){
        const error = await validate(dto);

        // console.log(error);
        

        if(error.length>0){
            return {isValid:false};
        }

        return {isValid:true};
    }
}
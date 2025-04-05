import { AppDataSource } from "../configs/database.config";
import { User } from "../entities/user.entity";
import { AppError } from "../types/app-error";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async(user:any)=>{
    try{
        return await userRepository.save(user);
    }
    catch(err){
        throw err;
        
    }
}

export const loginUser = async(user:any)=>{
    try{
        // console.log(user);
         
        return await userRepository.findOneBy(user);
    }
    catch(err){
        throw err;
        
    }
}

export const getUser = async(user:any)=>{
    try{
        let result = await userRepository.findOneBy(user);

        if(result===null){
            throw new AppError('Failed get user',500)
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const changePassword = async(user:any,password:string)=>{
    try{
        let result = await userRepository.update(user,{password:password});
        if(result.affected===0){
            throw new AppError('Failed change password',500)
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}
import { AppDataSource } from "../configs/database.config";
import { User } from "../entities/user.entity";

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
        return await userRepository.findOneBy(user);
    }
    catch(err){
        throw err;
        
    }
}

export const changePassword = async(user:any,password:string)=>{
    try{
        return await userRepository.update(user,{password:password});
    }
    catch(err){
        throw err;
        
    }
}
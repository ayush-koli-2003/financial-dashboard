import { AppDataSource } from "../configs/database.config";
import { User } from "../entities/user.entity";
import { AppError } from "../types/app-error";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async(user:Partial<User>)=>{
    try{
        return await userRepository.save(user);
    }
    catch(err){
        throw err;
        
    }
}

export const loginUser = async(user:Partial<User>)=>{
    try{
        // console.log(user);
         
        return await userRepository.findOneBy(user);
    }
    catch(err){
        throw err;
        
    }
}

export const getUser = async(user:Partial<User>)=>{
    try{
        let result = await userRepository.findOneBy(user);
        
        if(result===null){
            throw new AppError('Failed get user',500)
        }
        else if(result.status==='inactive'){
            throw new AppError('User is Inactive',500);
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const changePassword = async(user:Partial<User>,password:string)=>{
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

export const getAllUsers = async()=>{
    try{
        return await userRepository.find({where:{role:'user'}});
    }
    catch(err){
        throw err;
    }
}

export const getCountOfAllUsers = async()=>{
    try{
        return await userRepository.count({where:{role:'user'}});
    }
    catch(err){
        throw err;
    }
}

export const getCountOfActiveUsers = async()=>{
    try{
        return await userRepository.count({where:{status:'active',role:'user'}})
    }
    catch(err){
        throw err;
    }
}

export const changeStatus = async(user:Partial<User>,status:'active'|'inactive')=>{
    try{
        return await userRepository.update(user,{status:status});
    }
    catch(err){
        throw err;
    }
}


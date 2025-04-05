import { AppDataSource } from "../configs/database.config";
import { Profile } from "../entities/profile.entity";
import { AppError } from "../types/app-error";

const profileRepository = AppDataSource.getRepository(Profile);

export const getProfile = async(user:any)=>{
    try{
        let result = await profileRepository.findOne({
                relations:{
                    user:true
                },
                where:{
                    user:user
                }
            })
        if(result===null){
            throw new AppError('Failed get profile',500)
        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}

export const createProfile = async(profile:Partial<Profile>)=>{
    try{
        return await profileRepository.save(profile);
    }
    catch(err){
        throw err;
        
    }
}
 
export const updateProfile = async(profile:any)=>{
    try{
        let{id,...updatedProfile} = profile;
        let result = await profileRepository.update({id:profile.id},updatedProfile);

        if(result.affected===0){
            throw new AppError('Failed update profile',500);

        }
        else{
            return result;
        }
    }
    catch(err){
        throw err;
        
    }
}
import { AppDataSource } from "../configs/database.config";
import { Profile } from "../entities/profile.entity";

const profileRepository = AppDataSource.getRepository(Profile);

export const getProfile = async(user:any)=>{
    try{
        return await profileRepository.findOne({
            relations:{
                user:true
            },
            where:{
                user:user
            }
        })
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
        return await profileRepository.update({id:profile.id},updatedProfile);
    }
    catch(err){
        throw err;
        
    }
}
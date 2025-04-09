import { CurrencyCategory } from "../enums/currency.enum";
import { createProfile, getProfile, updateProfile } from "../repositories/profile.repository";
import { AppError } from "../types/app-error";

export class ProfileService{
    async getProfile(user:any){
        try{
            let result = await getProfile(user);
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

    async getCurrencyCategories(){
        return await Object.values(CurrencyCategory);
    }

    async updateProfile(user:any,profile:any){
        try{
            let existingProfile = await getProfile(user);

            if(existingProfile){
                console.log('exist user');
                
                profile.id = existingProfile.id;
                profile.user = user;
                return await updateProfile(profile);
            }
            else{
                console.log('new user');
                
                profile.user = user;
                return await createProfile(profile);
            }
        }
        catch(err){
            throw err;
            
        }
    }
}
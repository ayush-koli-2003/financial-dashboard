import { CurrencyCategory } from "../enums/currency.enum";
import { createProfile, getProfile, updateProfile } from "../repositories/profile.repository";

export class ProfileService{
    async getProfile(user:any){
        try{
            return await getProfile(user);
        }
        catch(err){
            console.log(err);
            
        }
    }

    async getCurrencyCategories(){
        return await Object.values(CurrencyCategory);
    }

    async updateProfile(user:any,profile:any){
        try{
            if(profile.notificationPreference==='No'){
                profile.notificationPreference = false;
            }
            else{
                profile.notificationPreference = true;
            }
            let existingProfile = await this.getProfile(user);

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
            console.log(err);
            
        }
    }
}
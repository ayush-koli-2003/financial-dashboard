import { IsBoolean, IsIn, IsNotEmpty, Matches } from "class-validator";
import { BaseDto } from "../base.dto";
import { CurrencyCategory } from "../../enums/currency.enum";
import { Profile } from "../../entities/profile.entity";

export class ProfileDto extends BaseDto{

    @IsNotEmpty()
    @Matches(/^[a-zA-Z]{2,}$/)
    firstname:string;

    @IsNotEmpty()
    @Matches(/^[a-zA-Z]{2,}$/)
    lastname:string;

    @IsIn(Object.values(CurrencyCategory))
    @IsNotEmpty()
    currencyPreference:string;

    @IsBoolean()
    @IsNotEmpty()
    notificationPreference:boolean;

    constructor(data:Partial<Profile>){
        super();
        
        if( data.notificationPreference !== undefined && data.firstname && data.lastname && data.currencyPreference){
            this.firstname = data.firstname;
            this.lastname = data.lastname;
            this.currencyPreference = data.currencyPreference;
            this.notificationPreference = data.notificationPreference;
            // console.log(this.notificationPreference);
            
        }
    }

    static async validate(data:any){
        // console.log(data.notificationPreference);
        
        let dto = new ProfileDto(data);
        // console.log(dto.notificationPreference);
        
        return BaseDto.validate(dto);
    }
}
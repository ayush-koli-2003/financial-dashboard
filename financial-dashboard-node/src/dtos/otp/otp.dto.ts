import { IsEmail, IsIn, IsNotEmpty, Length } from "class-validator";
import { BaseDto } from "../base.dto";

export class OtpDto extends BaseDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @IsIn(['register','change-email','delete-user'])
    type:'register'|'change-email'|'delete-user';

    constructor(data:{email:string,type:string}){
        super();
        this.email = data.email;
        if(data.type==='register'|| data.type ==='change-email'||data.type ==='delete-user'){
            this.type = data.type;
        }
    }

    static async validate(data:any){
        let dto = new OtpDto(data);
        return BaseDto.validate(dto);
    }
}
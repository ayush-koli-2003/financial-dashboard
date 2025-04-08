import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { BaseDto } from "../base.dto";

export class ChangePasswordDto extends BaseDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @MinLength(6)
    @IsString()
    currPassword:string;

    @MinLength(6)
    @IsString()
    newPassword:string;

    constructor(data:{email:string,currPassword:string,newPassword:string}){
        super();

        this.email = data.email;
        this.currPassword = data.currPassword;
        this.newPassword = data.newPassword;
    }

    static async validate(data:any){
        let dto = new ChangePasswordDto(data);
        return BaseDto.validate(dto);
    }
}
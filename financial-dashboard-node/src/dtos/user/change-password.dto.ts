import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { BaseDto } from "../base.dto";

export class ChangePasswordDto extends BaseDto{

    @MinLength(6)
    @IsString()
    currPassword:string;

    @MinLength(6)
    @IsString()
    newPassword:string;

    constructor(data:{currPassword:string,newPassword:string}){
        super();

        this.currPassword = data.currPassword;
        this.newPassword = data.newPassword;
    }

    static async validate(data:any){
        let dto = new ChangePasswordDto(data);
        return BaseDto.validate(dto);
    }
}
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { BaseDto } from "../base.dto";

export class RegisterDto extends BaseDto{
    
    @IsNotEmpty()
    username:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @MinLength(6)
    password:string;

    constructor(user:Partial<RegisterDto>){
        super();
        this.username = user.username || '';
        this.email = user.email || '';
        this.password = user.password || '';
    }

    static async validate(data:any){
        const dto = new RegisterDto(data);
        return BaseDto.validate(dto);
    }

}
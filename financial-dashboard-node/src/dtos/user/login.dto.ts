import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { BaseDto } from "../base.dto";
import { User } from "../../entities/user.entity";

export class LoginDto extends BaseDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @MinLength(6)
    password:string;

    constructor(user:Partial<User>){
        super();
        this.email = user.email || '';
        this.password = user.password || '';
    }

    static async validate(data: any){
        let dto = new LoginDto(data);
        return BaseDto.validate(dto);
    }
}
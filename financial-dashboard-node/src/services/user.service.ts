import { getUser, loginUser, registerUser } from "../repositories/user.repository";

export class UserService{
    async login(user:any){
        return await loginUser(user);
    }

    async register(user:any){
        let {password,...checkUser} = user;
        let existingUser:any = await this.login(checkUser);

        // console.log(existingUser);
        

        return existingUser.length > 0 ? null : await registerUser(user);
    }

    async getUser(user:any){
        return await getUser(user);
    }
}
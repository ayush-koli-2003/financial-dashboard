import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('db_fd_otps')
export class OTP{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'varchar'
    })
    otp:string;

    @Column({
        type:'varchar',
        length: "MAX"
    })
    email:string;

    @Column({
        type:"datetime2"
    })
    createdAt:Date;

    @Column({
        type:'varchar'
    })
    type:'register'|'change-email'|'delete-user'
}
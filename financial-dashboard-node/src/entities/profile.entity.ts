import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('db_fd_profile')
export class Profile{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable:true
    })
    firstname:string;

    @Column({
        nullable:true
    })
    lastname:string;

    @Column({
        nullable:true
    })
    profilePicture:string;

    @Column({
        nullable:true,
        default:'INR'
    })
    currencyPreference:string;

    @Column({
        default:true
    })
    notificationPreference:boolean;

    @OneToOne(()=>User,(user)=>user.profile,{onDelete:'CASCADE'})
    @JoinColumn()
    user:User;
}
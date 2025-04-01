import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { CurrencyCategory } from "../enums/currency.enum";

@Entity('db_fd__user__profile')
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
        type:'varchar'
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
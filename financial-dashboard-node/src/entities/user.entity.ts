import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import 'reflect-metadata';
import { Expense } from "./expense.entity";
import { Income } from "./income.entity";
import { Budget } from "./budget.entity";
import { Investment } from "./investment.entity";
import { Profile } from "./profile.entity";

@Entity('db_fd_user')
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @OneToMany(()=>Expense,(expense)=>expense.user,{cascade:true})
    expenses:Expense[];

    @OneToMany(()=>Income,(income)=>income.user,{cascade:true})
    incomes:Income[];

    @OneToMany(()=>Budget,(budget)=>budget.user,{cascade:true})
    budgets:Budget[];

    @OneToMany(()=>Investment,(investment)=>investment.user,{cascade:true})
    investments:Investment[];

    @OneToOne(()=>Profile,(profile)=>profile.user,{cascade:true})
    profile:Profile;
}
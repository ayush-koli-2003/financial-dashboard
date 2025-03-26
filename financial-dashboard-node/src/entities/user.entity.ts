import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import 'reflect-metadata';
import { Expense } from "./expense.entity";
import { Income } from "./income.entity";
import { Budget } from "./budget.entity";
import { Investment } from "./investment.entity";

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

    @OneToMany(()=>Expense,(expense)=>expense.user)
    expenses:Expense[];

    @OneToMany(()=>Income,(income)=>income.user)
    incomes:Income[];

    @OneToMany(()=>Budget,(budget)=>budget.user)
    budgets:Budget[];

    @OneToMany(()=>Investment,(investment)=>investment.user)
    investments:Investment[];
}
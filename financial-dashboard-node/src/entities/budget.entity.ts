import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BudgetCategory } from "../enums/budget.enum";
import { User } from "./user.entity";
import { Expense } from "./expense.entity";
import { Investment } from "./investment.entity";

@Entity('db_fd_budgets')
export class Budget{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        enum:BudgetCategory
    })
    category:BudgetCategory; 

    @Column({
        type:'float'
    })
    amount:number;

    @Column({
        type:'datetime'
    })
    date:Date;

    @ManyToOne(()=>User,(user)=>user.budgets,{onDelete:'CASCADE'})
    user:User;

    @OneToMany(()=>Expense,(expense)=>expense.budget)
    expenses:Expense[];

    @OneToMany(()=>Investment,(investment)=>investment.budget)
    investments:Investment[]

    constructor(category:BudgetCategory,amount:number,date:Date,user:User){
        this.category = category;
        this.amount=amount;
        this.date = date;
        this.user = user;
    }
}
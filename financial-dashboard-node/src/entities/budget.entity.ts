import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BudgetCategory } from "../enums/budget.enum";
import { User } from "./user.entity";

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
        type:'date'
    })
    date:Date;

    @ManyToOne(()=>User,(user)=>user.budgets,{onDelete:'CASCADE'})
    user:User;

    constructor(category:BudgetCategory,amount:number,date:Date,user:User){
        this.category = category;
        this.amount=amount;
        this.date = date;
        this.user = user;
    }
}
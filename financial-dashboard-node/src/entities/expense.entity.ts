import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpenseCategory } from "../enums/expense.enum";
import { User } from "./user.entity";
import { Budget } from "./budget.entity";

@Entity('db_fd_expense')
export class Expense{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'varchar',
        length:100
    })
    name:string;

    @Column({
        nullable:true,
        type:'varchar',
        length: "MAX"
    })
    note?:string;

    @Column({
        enum:ExpenseCategory
    })
    category:ExpenseCategory;

    @Column({
        type:'float'
    })
    amount:number;

    @Column({
        type:'datetime'
    })
    date:Date;

    @ManyToOne(()=>User,(user)=>user.expenses,{onDelete:'CASCADE'})
    user:User;

    @ManyToOne(()=>Budget,(budget)=>budget.expenses,{nullable:true})
    budget?:Budget;

    constructor(name:string,category:ExpenseCategory,amount:number,date:Date,user:User,note:string,budget?:Budget){
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.user = user;
        this.note = note;
        this.budget = budget;
    }
}
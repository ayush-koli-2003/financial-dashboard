import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpenseCategory } from "../enums/expense.enum";
import { User } from "./user.entity";

@Entity('db_fd_expense')
export class Expense{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({
        nullable:true
    })
    note?:string;

    @Column({
        enum:ExpenseCategory
    })
    category:ExpenseCategory;

    @Column()
    amount:number;

    @Column({
        type:'date'
    })
    date:Date;

    @ManyToOne(()=>User,(user)=>user.expenses,{eager:true})
    user:User;

    constructor(name:string,category:ExpenseCategory,amount:number,date:Date,user:User,note:string){
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.user = user;
        this.note = note;
    }
}
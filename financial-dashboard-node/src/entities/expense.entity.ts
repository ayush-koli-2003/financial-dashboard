import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpenseCategory } from "../enums/expense.enum";
import { User } from "./user.entity";

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
        type:'date'
    })
    date:Date;

    @ManyToOne(()=>User,(user)=>user.expenses,{onDelete:'CASCADE'})
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
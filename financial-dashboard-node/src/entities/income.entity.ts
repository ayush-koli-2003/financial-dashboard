import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IncomeCategory } from "../enums/income.entity";
import { User } from "./user.entity";

@Entity('db_fd_income')
export class Income{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    amount:number;

    @Column({
        enum:IncomeCategory
    })
    category:IncomeCategory;

    @Column({
        nullable:true
    })
    note?:string;

    @Column({
        type:'date'
    })
    date:Date;

    @ManyToOne(()=>User,(user)=>user.incomes)
    user:User;

    constructor(
        amount:number,
        category:IncomeCategory,
        date:Date,
        user:User,
        note?:string,
    ){
        this.amount=amount
        this.category=category
        this.note=note
        this.date = date
        this.user = user
    }
}
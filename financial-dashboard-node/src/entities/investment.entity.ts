import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvestmentCategory } from "../enums/investment.enum";
import { User } from "./user.entity";

@Entity('db_fd_investment')
export class Investment{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({
        nullable:true
    })
    note?:string;

    @Column({
        enum:InvestmentCategory
    })
    category:InvestmentCategory;

    @Column()
    amount:number;

    @Column({
        nullable:true
    })
    returns?:number;

    @Column({
        type:'date'
    })
    date:Date;

    @ManyToOne(()=>User,(user)=>user.investments,{onDelete:'CASCADE'})
    user:User;

    constructor(
        name:string,        
        category:InvestmentCategory,
        amount:number,
        date:Date,
        user:User,
        note?:string,
        returns?:number,
    ){
        this.name=name
        this.category=category
        this.amount=amount
        this.date=date
        this.user=user
        this.note=note
        this.returns=returns
    }
}
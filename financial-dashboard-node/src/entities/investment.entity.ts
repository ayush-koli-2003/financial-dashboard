import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvestmentCategory } from "../enums/investment.enum";
import { User } from "./user.entity";

@Entity('db_fd_investment')
export class Investment{
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
        enum:InvestmentCategory
    })
    category:InvestmentCategory;

    @Column({
        type:'float'
    })
    amount:number;

    @Column({
        nullable:true,
        type:'float'
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
import { InvestmentCategory } from "../enums/investment-category.enum";

export interface Investment{
    id:number,
    name:string,
    note?:string,
    category:InvestmentCategory,
    amount:number,
    returns?:number,
    date:Date
}
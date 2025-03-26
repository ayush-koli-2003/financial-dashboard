import { IncomeCategory } from "../enums/income-category.enum";

export interface Income{
    id:number,
    amount:number,
    category:IncomeCategory,
    date:Date
    note?:string
}
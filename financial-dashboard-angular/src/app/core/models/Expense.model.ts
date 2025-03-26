import { ExpenseCategory } from "../enums/expense-category.enum";

export interface Expense{
    id:number,
    name:string,
    note?:string,
    category:ExpenseCategory,
    amount:number,
    date:Date,
}
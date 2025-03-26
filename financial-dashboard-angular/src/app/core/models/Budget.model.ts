import { ExpenseCategory } from "../enums/expense-category.enum";
import { InvestmentCategory } from "../enums/investment-category.enum";

export interface Budget{
    id:number,
    category:ExpenseCategory|InvestmentCategory,
    amount:number,
    date:Date;
}
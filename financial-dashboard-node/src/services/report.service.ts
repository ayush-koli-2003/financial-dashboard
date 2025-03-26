import { Expense } from "../entities/expense.entity";
import { Income } from "../entities/income.entity";
import { BudgetCategory } from "../enums/budget.enum";
import { ExpenseCategory } from "../enums/expense.enum";
import { IncomeCategory } from "../enums/income.entity";
import { BudgetService } from "./budget.service";
import { ExpenseService } from "./expenses.service";
import { IncomeService } from "./income.service";
import { InvestmentService } from "./investment.service";

const budgetService = new BudgetService();
const expenseService = new ExpenseService();
const incomeService = new IncomeService();
const investmentService = new InvestmentService();

export class ReportService{
  async getExpenseReport(user: any, startDate:any, endDate:any) {
    const expenses = await expenseService.getExpenseByDate(user, startDate, endDate);
    const expenseByCategory = (expenses as Expense[]).reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);
  
    return {
      labels: Object.keys(ExpenseCategory),
      datasets: [
        {
          data: Object.values(expenseByCategory),
        }
      ]
    };
  } 

  async getIncomeReport(user:any,startDate:any,endDate:any) {
    const incomes = await incomeService.getIncomesByDate(user, startDate, endDate);
    const incomeByCategory = (incomes as Income[]).reduce((acc, inc) => {
      acc[inc.category] = (acc[inc.category] || 0) + inc.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(IncomeCategory),
      datasets: [
        {
          data: Object.values(incomeByCategory),
        }
      ]
    };
  }

//   async getBudgetVsExpense(user: any, startDate:any, endDate:any) {
//     const budget = await budgetService.getBudgetByDate(user,startDate,endDate);
//     const expenses = await expenseService.getExpenseByDate(user,startDate,endDate);

//     const totalExpense = (expenses as Expense[]).reduce((sum, exp) => sum + exp.amount, 0);
//     const totalBudget = budget?.amount || 0;

//     return {
//       labels: ["Budget", "Actual Expense"],
//       datasets: [
//         {
//           label: "Amount",
//           data: [totalBudget, totalExpense],
//           backgroundColor: ["#36A2EB", "#FF6384"],
//         }
//       ]
//     };
//   }
}
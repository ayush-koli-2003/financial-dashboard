import { Budget } from "../entities/budget.entity";
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
    async getBudgetVsExpense(user:any, startDate:any, endDate:any){
        try{
            const budgets = await budgetService.getBudgetByDate(user,startDate,endDate);
            const expenses = await expenseService.getExpenseByDate(user,startDate,endDate);

            // let budgetRawCategories = await budgetService.getBudgetCategories(user);

            // let budgetCategories = budgetRawCategories?.map(b=> b.category);

            // console.log(budgetCategories);

            let expenseCategories = await expenseService.getExpenseCategories(user);
            
            
 
            const budgetExpenseCategories = new Set([...(budgets as Budget[]).map(b=>b.category).filter(cat=> expenseCategories?.find(e=> e as string ===cat as string))]);

            let budgetData: any[]=[];
            let expenseData: any[]=[];
            let labels:any[]=[];

            budgetExpenseCategories.forEach(
                (cat)=>{ 
                    labels.push(cat);
                    let filteredBudgetCategories = budgets?.filter(b=>b.category===cat);
                    let totalBudget = filteredBudgetCategories?.reduce((total,b)=> total+b.amount,0);
                    budgetData.push(totalBudget);

                    let filteredExpenseCategories = expenses?.filter(e=>e.category as string===cat);
                    let totalExpense = filteredExpenseCategories?.reduce((total,e)=>total+e.amount,0);
                    expenseData.push(totalExpense);
                } 
            )

            return {
                chartType: 'bar',
                data:[
                    {data:budgetData,label:'Budget'},
                    {data:expenseData,label:'Expense'}
                ],
                labels
            };
        }
        catch(err){

        }
    }
    async getExpenseReport(user: any, startDate:any, endDate:any) {
        try{
            const expenses = await expenseService.getExpenseByDate(user,startDate,endDate);
            const expenseCategories = [...new Set((expenses as Expense[]).map(e=> e.category))];

            const expenseData = expenseCategories.map(
                (cat)=>{
                    let filteredExpenses = expenses?.filter(e=>e.category===cat);
                    let totalExpense = filteredExpenses?.reduce((total,e)=>total+e.amount,0);
                    return totalExpense;
                }
            )
 
            return {
                chartType: 'doughnut',
                data: [{data:expenseData,label:'Expenses'}],
                labels: expenseCategories
            }

            
        }
        catch(err){
            console.log(err);
            
        }
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
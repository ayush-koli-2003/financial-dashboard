import { BudgetService } from "./budget.service";
import { ExpenseService } from "./expenses.service"
import { IncomeService } from "./income.service";
import { InvestmentService } from "./investment.service";

const expenseService = new ExpenseService();
const incomeService = new IncomeService();
const budgetService = new BudgetService();
const investmentService = new InvestmentService();

export class DashboardService{
    
    async getDashboardData(user:any,startDate:any,endDate:any){
        let totalExpenseByDate = (await expenseService.getTotalExpenseByDate(user,startDate,endDate)) || 0;
        let totalIncomeByDate = (await incomeService.getTotalIncomeByDate(user,startDate,endDate)) || 0;
        let totalBudgetByDate = (await budgetService.getTotalBudgetByDate(user,startDate,endDate)) || 0;
        let totalInvestmentByDate = (await investmentService.getTotalInvestmentByDate(user,startDate,endDate))||0;
        
        return {totalBudgetByDate,totalExpenseByDate,totalIncomeByDate,totalInvestmentByDate}
    }

    async getTransactionsByDate(user:any,startDate:any,endDate:any){
        let expenses = await expenseService.getExpenseByDate(user,startDate,endDate);
        let budgets = await budgetService.getBudgetByDate(user,startDate,endDate);
        let incomes = await incomeService.getIncomesByDate(user,startDate,endDate);
        let investments = await investmentService.getInvestmentsByDate(user,startDate,endDate);

        let expenseList = expenses?.map((e:any)=>{
            let d:any = {...e,type:'Expense'}
            let {user,...data} = d;
            return data;
        })

        let incomeList = incomes?.map((i:any)=>{
            let d:any = {...i,type:'Income'}
            let {user,...data} = d;
            return data;
        })

        let budgetList = budgets?.map((e:any)=>{
            let d:any = {...e,type:'Budget'}
            let {user,...data} = d;
            return data;
        })

        let investmentList = investments?.map((i:any)=>{
            let d:any = {...i,type:'Investment'}
            let {user,...data} = d;
            return data;
        })

        let transactions = expenseList?.concat(incomeList).concat(investmentList);
        transactions?.sort((a,b)=> {
            let date1 = new Date(a.date);
            let date2 = new Date(b.date);

            if(date1>date2){
                return -1;
            }

            return 1;
        });

        return transactions;
        
        
        
    }
}
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

            // console.log(budgetData);
            

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
            throw err;
            
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

    // Trends Reports

    async getIncomeVsExpenseTrend(user:any,startDate:any,endDate:any,pastMonths:any){
        try{
            // console.log(pastMonths);
            
            let year = startDate.split('-')[0];
            let month = startDate.split('-')[1];

            startDate = new Date(year,month-pastMonths+1,1).toISOString().split('T')[0];
            // console.log(startDate);
            
            let monthsList:any[] =[]
            // let monthlyExpenseData : Map<'string',{expense:number}> = new Map();
            // let monthlyIncomeDate: Map<'string'> = new Map();

            let startMonth = parseInt(startDate.split('-')[1]);
            let endMonth = parseInt(endDate.split('-')[1]);

            // console.log(startMonth,endMonth);

            if(startMonth===endMonth){
                endMonth --;
            }
            

            for(let m=startMonth+1; m!== endMonth+1;m=((m+1)%12)){              
                monthsList.push(m);   
            }

            // console.log(monthsList);
            

            let incomes = await incomeService.groupIncomeByMonth(user,startDate,endDate);
            let expenses = await expenseService.groupExpenseByMonth(user,startDate,endDate);

            // console.log(incomes);
            monthsList.reverse().map(m=>{
                if(incomes?.findIndex((i)=>i.month==m)===-1){
                    incomes.unshift({month:m,income:0})
                }
                if(expenses?.findIndex((i)=>i.month==m)===-1){
                    expenses.unshift({month:m,expense:0})
                }
            })

            // console.log(expenses);
            
            monthsList = [];
            for(let i=0; i<Math.min(incomes?.length as number,expenses?.length as number);i++){
                if(incomes?.[i].month === expenses?.[i].month){
                    let date = new Date();
                    date.setMonth(parseInt(incomes?.[i].month)-1);
                    let month = date.toLocaleString('default', { month: 'short' });
                    monthsList.push(month)
                }
            }

            // monthsList = monthsList.map(m=>{                
            //     let date = new Date();
            //     date.setMonth(m-1);
            //     let month = date.toLocaleString('default', { month: 'short' });
            //     m = month;
            //     return m;
            // })
            
            // console.log(monthsList);

            return {
                chartType:'line',
                labels: monthsList,
                data: [
                    {data:incomes?.map(i=> i.income),label:'Income'},
                    {data:expenses?.map(e=> e.expense),label:'Expense'}
                ]
            }
        }
        catch(err){
            throw err;
            
        }
    }

    async getSavingsTrend(user:any,startDate:any,endDate:any,pastMonths:any){
        try{
            let year = startDate.split('-')[0];
            let month = startDate.split('-')[1];

            startDate = new Date(year,month-pastMonths+1,1).toISOString().split('T')[0];
            
            let monthsList:any[] =[];

            let startMonth = parseInt(startDate.split('-')[1]);
            let endMonth = parseInt(endDate.split('-')[1]);

            if(startMonth===endMonth){
                endMonth --;
            }
            

            for(let m=startMonth+1; m!== endMonth+1;m=((m+1)%12)){              
                monthsList.push(m);   
            }

            let incomes = await incomeService.groupIncomeByMonth(user,startDate,endDate);
            let expenses = await expenseService.groupExpenseByMonth(user,startDate,endDate);

            monthsList.reverse().map(m=>{
                if(incomes?.findIndex((i)=>i.month==m)===-1){
                    incomes.unshift({month:m,income:0})
                }
                if(expenses?.findIndex((i)=>i.month==m)===-1){
                    expenses.unshift({month:m,expense:0})
                }
            })

            // monthsList = monthsList.map(m=>{                
            //     let date = new Date();
            //     date.setMonth(m-1);
            //     let month = date.toLocaleString('default', { month: 'short' });
            //     m = month;
            //     return m;
            // })

            // console.log(monthsList);
            

            let savingsList:any[]=[];
            monthsList=[];
            for(let i=0; i<Math.min(incomes?.length as number,expenses?.length as number);i++){
                if(incomes?.[i].month === expenses?.[i].month){
                    savingsList.push(incomes?.[i].income-expenses?.[i].expense);
                    let date = new Date();
                    date.setMonth(parseInt(incomes?.[i].month)-1);
                    let month = date.toLocaleString('default', { month: 'short' });
                    monthsList.push(month);
                }
            }

            
            // console.log(savingsList);
            

            return {
                chartType:'line',
                labels: monthsList,
                data: [
                    {data:savingsList,label:'Savings'}
                ]
            }
        }
        catch(err){
            throw err;
            
        }
    }
}
import { Budget } from "../entities/budget.entity";
import { Expense } from "../entities/expense.entity";
import { Income } from "../entities/income.entity";
import { User } from "../entities/user.entity";
import { BudgetCategory } from "../enums/budget.enum";
import { ExpenseCategory } from "../enums/expense.enum";
import { IncomeCategory } from "../enums/income.entity";
import { AppError } from "../types/app-error";
import { BudgetService } from "./budget.service";
import { ExpenseService } from "./expenses.service";
import { IncomeService } from "./income.service";
import { InvestmentService } from "./investment.service";
import fs from 'fs';
import {Parser} from 'json2csv';

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

            // console.log(year,month);

            startDate = new Date(year,month-pastMonths+1,1).toISOString().split('T')[0]; 
            endDate = endDate.split('T')[0];
            // console.log(startDate);

            
            // console.log(startDate,endDate);
            
            let monthsList:any[] =[]
            // let monthlyExpenseData : Map<'string',{expense:number}> = new Map();
            // let monthlyIncomeDate: Map<'string'> = new Map();

            let startMonth = parseInt(startDate.split('-')[1]);
            let endMonth = parseInt(endDate.split('-')[1]);

            // console.log(startMonth,endMonth);

            if(startMonth===endMonth){
                endMonth --;
            }
            

            for(let m=startMonth+1; m!== endMonth+1;m=((m+1)%13)){              
                if(m!==0){
                    monthsList.push(m);
                }   
            }

            if(startMonth===endMonth+1){
                monthsList.push(endMonth+1);
            }

            
            

            let incomes = await incomeService.groupIncomeByMonth(user,startDate,endDate);
            let expenses = await expenseService.groupExpenseByMonth(user,startDate,endDate);

            // console.log(incomes,expenses);
            // monthsList.reverse().map(m=>{
            //     if(incomes?.findIndex((i)=>i.month==m)===-1){
            //         incomes.unshift({month:m,income:0});
            //         console.log('not found ',m);
                    
            //     }
            //     if(expenses?.findIndex((i)=>i.month==m)===-1){
            //         expenses.unshift({month:m,expense:0})
            //     }
            // })

            let parsedIncomes = [];
            let parsedExpenses = [];

            let place =0;

            for(let m of monthsList){
                let index = incomes?.findIndex((i)=>i.month==m);
                if(index===-1){
                    parsedIncomes.splice(place,0,{month:m,income:0});
                    console.log('not found ',m);
                    place++;
                    
                }
                else{
                    parsedIncomes.push({month:m,income:(incomes as any[])[index].income});
                }
            }

            place = 0;

            for(let m of monthsList){
                let index = expenses?.findIndex((i)=>i.month==m);
                if(index===-1){
                    parsedExpenses.splice(place,0,{month:m,expense:0});
                    // console.log('not found ',m);
                    place++;
                }
                else{
                    parsedExpenses.push({month:m,expense:(expenses as any[])[index].expense});
                }
            }

            

            // // console.log(expenses);
            
            monthsList = [];
            for(let i=0; i<Math.min(parsedIncomes?.length as number,parsedExpenses?.length as number);i++){
                if(parsedIncomes?.[i].month === parsedExpenses?.[i].month){
                    let date = new Date();
                    date.setMonth(parseInt(parsedIncomes?.[i].month)-1);
                    let month = date.toLocaleString('default', { month: 'short' });
                    monthsList.push(month)
                }
            }

            return {
                chartType:'line',
                labels: monthsList,
                data: [
                    {data:parsedIncomes?.map(i=> i.income),label:'Income'},
                    {data:parsedExpenses?.map(e=> e.expense),label:'Expense'}
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
            endDate = endDate.split('T')[0];

            let monthsList:any[] =[];

            let startMonth = parseInt(startDate.split('-')[1]);
            let endMonth = parseInt(endDate.split('-')[1]);

            if(startMonth===endMonth){
                endMonth --;
            }
            

            for(let m=startMonth+1; m!== endMonth+1;m=((m+1)%13)){              
                if(m!==0){
                    monthsList.push(m);
                }   
            }

            if(startMonth===endMonth+1){
                monthsList.push(endMonth+1);
            }

            let incomes = await incomeService.groupIncomeByMonth(user,startDate,endDate);
            let expenses = await expenseService.groupExpenseByMonth(user,startDate,endDate);

            let parsedIncomes = [];
            let parsedExpenses = [];

            let place =0;

            for(let m of monthsList){
                let index = incomes?.findIndex((i)=>i.month==m);
                if(index===-1){
                    parsedIncomes.splice(place,0,{month:m,income:0});
                    // console.log('not found ',m);
                    place++;
                    
                }
                else{
                    parsedIncomes.push({month:m,income:(incomes as any[])[index].income});
                }
            }

            place = 0;

            for(let m of monthsList){
                let index = expenses?.findIndex((i)=>i.month==m);
                if(index===-1){
                    parsedExpenses.splice(place,0,{month:m,expense:0});
                    // console.log('not found ',m);
                    place++;
                }
                else{
                    parsedExpenses.push({month:m,expense:(expenses as any[])[index].expense});
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
            

            let savingsList:any[]=[];
            monthsList=[];
            for(let i=0; i<Math.min(parsedIncomes?.length as number,parsedExpenses?.length as number);i++){
                if(parsedIncomes?.[i].month === parsedExpenses?.[i].month){
                    savingsList.push(parsedIncomes?.[i].income-parsedExpenses?.[i].expense);
                    let date = new Date();
                    date.setMonth(parseInt(parsedIncomes?.[i].month)-1);
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

    async generateBudgetVsExpenseCSV(user:Partial<User>,startDate:string,endDate:string){
        let report = await this.getBudgetVsExpense(user,startDate,endDate);

        if(!report?.labels){
            throw new AppError('No data available',500);
        }
        else{
            const data = report.labels.map((category:string,i:number)=>({
                Category: String(category || '').replace(/[^\w\s-]/g,''),
                Budget: (report.data[0].data[i] || 0),
                Expense: (report.data[1].data[i] || 0)

            }))

            let columns = ['Category','Budget','Expense'];
            let jsonParser = new Parser({fields:columns,delimiter:',',quote:'"'});
            try {
                return jsonParser.parse(data);
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    async generateExpenseReportCSV(user:Partial<User>,startDate:string,endDate:string){
        let report = await this.getExpenseReport(user,startDate,endDate);

        if(!report?.labels){
            throw new AppError('No data available',500);
        }
        else{
            const data = report.labels.map((category:string,i:number)=>({
                Category: String(category || '').replace(/[^\w\s-]/g,''),
                Expense: (report.data[0].data[i] || 0),

            }))

            let columns = ['Category','Expense'];
            let jsonParser = new Parser({fields:columns,delimiter:',',quote:'"'});
            try {
                return jsonParser.parse(data);
            } catch (error) {
                console.log(error);
                
            }
            // console.log(report);
            
        }
    }

    // async generateMonthlyReportZip(user:Partial<User>,startDate:string,endDate:string){
    //     try{
    //         let budgetVsExpenseCSV = await this.generateBudgetVsExpenseCSV(user,startDate,endDate);
    //     }
    // }
}
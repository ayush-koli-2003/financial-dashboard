import { Request, Response } from "express";
import { BudgetService } from "../services/budget.service";
import { BudgetCategory } from "../enums/budget.enum";

const budgetService = new BudgetService();
export const getAllBudgets = async(req:Request,res:Response)=>{
    try{
        let budget = req.body;
        budget.amount = parseFloat(budget.amount);
        let user = req.body.user;

        let results = await budgetService.getAllBudgets(user);

        res.json({
            status:'successfull',
            data:results
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const addBudget = async(req:Request,res:Response)=>{
    try{   
        let user = req.body.user;
        let budget = req.body;

        console.log(budget);
        
        let results = await budgetService.createBudget(budget,user);

        res.json({
            status:'successfull',
            data:'Budget is added'
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const getFilteredCategories = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;
        let results = await budgetService.getFilteredCategories(user);

        res.json({
            status:"successfull",
            data:results
        })
    }
    catch(err){
        console.log(err);
        
    }
}

export const getBudgetByDate = async(req:Request,res:Response)=>{
    try{
        let user = req.body.user;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let budgets = await budgetService.getBudgetByDate(user,startDate,endDate);
        // console.log(budgets);
        // let budgetsByCat:{category:BudgetCategory,amount:number}[] = new Array();
        // if(budgets){
        //     budgets.map(b=>{
        //         budgetsByCat.push({category:b.category,amount:b.amount})
        //     })
        // }
        
        res.json({
            status:'successfull',
            data:budgets
        });
    }
    catch(err){
        console.log(err);
        
    }
}
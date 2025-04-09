import { AppDataSource } from "../configs/database.config";
import { User } from "../entities/user.entity";
import { getCountOfExpenseTransactionsThisMonth } from "../repositories/expense.repository";
import { getCountOfIncomeTransactionsThisMonth } from "../repositories/income.repository";
import { getCountOfInvestmentTransactionsThisMonth } from "../repositories/investment.repository";
import { getAllUsers, getCountOfActiveUsers, getCountOfAllUsers } from "../repositories/user.repository";

export class AdminService{
    async getAdminDashboardData(startDate:string,endDate:string){
        let totalUsers = await getCountOfAllUsers();
        let totalActiveUsers = await getCountOfActiveUsers();
        let totalTransactions = (await getCountOfExpenseTransactionsThisMonth(startDate,endDate)) + (await getCountOfIncomeTransactionsThisMonth(startDate,endDate)) + (await getCountOfInvestmentTransactionsThisMonth(startDate,endDate));

        return {
            totalUsers,
            totalActiveUsers,
            totalTransactions
        }
    }

    async getAllUsers(){
        return await getAllUsers();
    }
}
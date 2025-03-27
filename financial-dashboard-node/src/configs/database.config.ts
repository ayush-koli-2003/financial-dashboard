import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { Budget } from "../entities/budget.entity";
import { Expense } from "../entities/expense.entity";
import { Income } from "../entities/income.entity";
import { Investment } from "../entities/investment.entity";
import { Profile } from "../entities/profile.entity";

export const AppDataSource = new DataSource({
    type:'mssql',
    host:process.env.DB_HOST,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port:Number(process.env.DB_PORT),
    options:{
        encrypt:true,
        trustServerCertificate:true
    },
    synchronize:true,
    entities:[User,Budget,Expense,Income,Investment,Profile]
})
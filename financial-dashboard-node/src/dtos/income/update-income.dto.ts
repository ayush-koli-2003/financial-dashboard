import { IsDate, IsDateString, IsIn, isISO8601, IsISO8601, IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";
import { BaseDto } from "../base.dto";
import { BudgetCategory } from "../../enums/budget.enum";
import { Budget } from "../../entities/budget.entity";
import { IncomeCategory } from "../../enums/income.entity";
import { Income } from "../../entities/income.entity";

export class UpdateIncomeDto extends BaseDto{

    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @IsIn(Object.values(IncomeCategory))
    @IsNotEmpty()
    category:IncomeCategory;

    @IsOptional()
    note:string;

    constructor(income:Partial<Income>){
        super();
        if(income.note){
            this.note = income.note;
        }
        if(income.category && income.amount){
            this.amount = income.amount;
            this.category = income.category;
        }

    }

    static async validate(data:any){
        let dto = new UpdateIncomeDto(data);
        return BaseDto.validate(dto);
    }
}
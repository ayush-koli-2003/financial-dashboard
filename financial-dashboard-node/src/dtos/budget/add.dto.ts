import { IsDate, IsDateString, IsIn, isISO8601, IsISO8601, IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";
import { BaseDto } from "../base.dto";
import { BudgetCategory } from "../../enums/budget.enum";
import { Budget } from "../../entities/budget.entity";

export class AddBudgetDto extends BaseDto{
    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @MaxLength(10)
    @IsDateString()
    date:Date

    @IsIn((Object.values(BudgetCategory)))
    @IsNotEmpty()
    category:BudgetCategory;

    constructor(budget:Partial<Budget>){
        super();
        if(budget.category && budget.amount && budget.date){
            this.category = budget.category;            
            this.date = budget.date;
            this.amount = budget.amount;
        }
    }

    static async validate(data:any){
        let dto = new AddBudgetDto(data);
        return BaseDto.validate(dto);
    }
}
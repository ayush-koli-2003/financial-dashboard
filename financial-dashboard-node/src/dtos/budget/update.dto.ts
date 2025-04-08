import { IsDate, IsDateString, IsIn, isISO8601, IsISO8601, IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";
import { BaseDto } from "../base.dto";
import { BudgetCategory } from "../../enums/budget.enum";
import { Budget } from "../../entities/budget.entity";

export class UpdateBudgetDto extends BaseDto{
    @IsNumber()
    id:number;

    @IsNumber()
    @IsNotEmpty()
    amount:number;

    constructor(budget:Partial<Budget>){
        super();
        console.log(budget);
        
        if(budget.id && budget.amount){
            this.id = budget.id;
            this.amount = budget.amount;
        }

    }

    static async validate(data:any){
        let dto = new UpdateBudgetDto(data);
        return BaseDto.validate(dto);
    }
}
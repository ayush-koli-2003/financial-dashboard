import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";
import { BaseDto } from "../base.dto";
import { ExpenseCategory } from "../../enums/expense.enum";
import { Expense } from "../../entities/expense.entity";

export class UpdateExpenseDto extends BaseDto{
    
    @IsNotEmpty()
    name:string;

    @IsIn(Object.values(ExpenseCategory))
    category:ExpenseCategory;

    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @IsOptional()
    note:string;

    constructor(expense:Partial<Expense>){
        super();
        if(expense.note){
            this.note = expense.note
        }
        if(expense.amount && expense.category && expense.name){
            this.amount = expense.amount;
            this.category = expense.category;
            this.name = expense.name;
        }
    }

    static async validate(data:any){
        let dto = new UpdateExpenseDto(data);
        return BaseDto.validate(dto);
    }
}
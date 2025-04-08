import { IsNumber, IsNotEmpty, IsIn, MaxLength, IsDateString, IsOptional } from "class-validator";
import { Income } from "../../entities/income.entity";
import { IncomeCategory } from "../../enums/income.entity";
import { BaseDto } from "../base.dto";

export class AddIncomeDto extends BaseDto{
    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @IsIn(Object.values(IncomeCategory))
    @IsNotEmpty()
    category:IncomeCategory;

    @IsDateString()
    date:Date;

    @IsOptional()
    note:string;

    constructor(income:Partial<Income>){
        super();
        if(income.note){
            this.note = income.note;
        }
        if(income.category && income.amount && income.date){
            this.amount = income.amount;
            this.category = income.category;
            this.date = income.date;
        }

    }

    static async validate(data:any){
        let dto = new AddIncomeDto(data);
        return BaseDto.validate(dto);
    }
}
import { IsNotEmpty, IsIn, IsNumber, MaxLength, IsDateString, IsOptional } from "class-validator";
import { Investment } from "../../entities/investment.entity";
import { InvestmentCategory } from "../../enums/investment.enum";
import { BaseDto } from "../base.dto";

export class AddInvestmentDto extends BaseDto{
    @IsNotEmpty()
    name:string;

    @IsIn(Object.values(InvestmentCategory))
    category:InvestmentCategory;

    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @IsDateString()
    date:Date;

    @IsOptional()
    note:string;

    constructor(investment:Partial<Investment>){
        super();
        if(investment.note){
            this.note = investment.note;
        }
        if(investment.amount && investment.category && investment.name && investment.date){
            this.amount = investment.amount;
            this.category = investment.category;
            this.name = investment.name;
            this.date = investment.date
        }
    }

    static async validate(data:any){
        let dto = new AddInvestmentDto(data);
        return BaseDto.validate(dto);
    }
}
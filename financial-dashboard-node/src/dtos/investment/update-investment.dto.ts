import { IsNotEmpty, IsIn, IsNumber, IsOptional } from "class-validator";
import { Investment } from "../../entities/investment.entity";
import { InvestmentCategory } from "../../enums/investment.enum";
import { BaseDto } from "../base.dto";

export class UpdateInvestmentDto extends BaseDto{
    @IsNotEmpty()
    name:string;

    @IsIn(Object.values(InvestmentCategory))
    category:InvestmentCategory;

    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @IsOptional()
    note:string;

    constructor(investment:Partial<Investment>){
        super();
        if(investment.note){
            this.note = investment.note;
        }
        if(investment.amount && investment.category && investment.name){
            this.amount = investment.amount;
            this.category = investment.category;
            this.name = investment.name;
        }
    }

    static async validate(data:any){
        let dto = new UpdateInvestmentDto(data);
        return BaseDto.validate(dto);
    }
}
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()

export class CurrentDateService{
    currDate:{month:string,year:string,time?:'string'}

    currDateSub:BehaviorSubject<any>;
    currDateObs$:Observable<any> 

    constructor(){
        let date = new Date();
        this.currDate = {month:((date.getMonth()+1).toString()),year:((date.getFullYear()).toString())};
        
        this.currDateSub = new BehaviorSubject(this.currDate);
        this.currDateObs$ = this.currDateSub.asObservable();
    }

    updateDate(newDate:{month:string,year:string}){
        this.currDate.month = newDate.month;
        this.currDate.year = newDate.year;

        console.log('date updated');
        

        this.currDateSub.next(this.currDate);
    }
}
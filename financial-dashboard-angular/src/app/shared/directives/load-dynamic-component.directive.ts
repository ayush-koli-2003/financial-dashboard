import { Directive, ViewChild, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[loadDynamicComponent]',
    standalone:false
})

export class LoadDynamicComponentDirective{
    constructor(public vcr:ViewContainerRef){

    }
}
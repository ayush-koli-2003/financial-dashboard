import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  standalone: false,
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent {
  @Input() form!: FormGroup;
  @Input() categories:any[]=[];
  @Input() errorMessages:{[key:string]:string}={};
  @Input() inputControls!:{name:string,label:string,type:string}[];
  @Input() formType!:'add'|'edit'|'submit';
  @Input() editData:any;
  @Output() submitEvent = new EventEmitter();
  @Input() serverError!:string[];
  previousForm!:FormGroup;

  formLabel!:string;
  isSubmitted!:boolean;

  ngOnInit(): void {
    this.isSubmitted = false;

    

    this.form.valueChanges.subscribe(
      (value:any)=>{
        
        if(this.form.value!==this.editData){
          
        console.log(value);
          
          this.isSubmitted = false;
        }
        
      }
    )
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['form']){
      this.isSubmitted = false;
    }
    if(changes['formType']){
      if(this.formType==='add'){
        this.formLabel = 'Add'
      }
      else if(this.formType=='edit'){
        this.formLabel = 'Update';        
      }
      else{
        this.formLabel = 'Submit'
      }
    }
    
    if(changes['editData'] && this.editData !== undefined){
      this.form.patchValue(this.editData);
      this.previousForm = this.form;
      // console.log('sybmit false');
      
      this.isSubmitted = true;
    }

    if(changes['serverError']){
      console.log(this.serverError);
      
      if(this.serverError){
        this.isSubmitted = false;
        console.log(this.isSubmitted);
        
      }
    }
  }

  emitEvent(value:any){
    this.submitEvent.emit(value);
  }

  onSubmit(){
    if(this.form.valid){
      // console.log(this.addForm.value);
      console.log(this.form.value);
      if(this.form.value.amount){
        this.form.value.amount = parseFloat(this.form.value.amount);
      }
      this.isSubmitted = true
      console.log(this.form.value);
      
      this.emitEvent(this.form.value);
    }
  }

  onCancel(){
    this.submitEvent.emit('exit');
  }
}

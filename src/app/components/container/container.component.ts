import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, pluck, tap } from 'rxjs';
import { FixerService } from '../../services/fixer.service';


export interface IFormConfig {
  title: 'From' | 'To' | 'Amount';
  formControl: FormControl;
  type: 'input' | 'select';
  lable: string;

}




@Component({
  selector: 'dc-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  configs!: IFormConfig[];
  public latest$!: Observable<string[]>;
  public result$!: Observable<string>;

  form: FormGroup;
  from = new FormControl(null , Validators.required);
  to = new FormControl(null , Validators.required);
  amount = new FormControl(null ,  Validators.pattern(RegExp('^[0-9]')));

  constructor( private readonly fixerService : FixerService ) {
    this.form = new FormGroup({
      from: this.from,
      to: this.to,
      amount: this.amount
    });
  }

  convert() {
    const {from, to , amount } = this.form.value;
   this.result$ = this.fixerService.getLatest().pipe(
      tap(console.log),
      pluck('rates', to as string),
      map(val => ((amount as number) * val).toFixed(2))
    )
  }

  ngOnInit(): void {
    this.configs = [
      {
        title: 'From',
        formControl: this.from,
        type: 'select',
        lable: 'starting currency'

      },
      {
        title: 'To',
        formControl: this.to,
        type: 'select',
        lable: 'converting currency'

      },
      {
        title: 'Amount',
        formControl: this.amount,
        type: 'input',
        lable: 'amount to convert'

      },
    ]
    this.latest$  = this.fixerService.getLatest().pipe(
      pluck('rates'),
      tap(console.log),
      map(val => Object.keys(val))
    ) ;
  }

}

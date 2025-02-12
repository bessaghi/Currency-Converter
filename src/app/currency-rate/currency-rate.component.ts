import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {fixedRate, rateInvalid} from '../../store/converter/converter.selectors';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {updateFixedRate, useFixedRate, useRealRate} from '../../store/converter/converter.actions';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'currency-rate',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './currency-rate.component.html'
})
export class CurrencyRateComponent implements OnInit {

  fixedRate$: Observable<number>
  rateInvalid$: Observable<boolean>

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(useRealRate());
    this.rateInvalid$ = this.store.pipe(select(rateInvalid));
    this.fixedRate$ = this.store.pipe(select(fixedRate));
  }

  updateFixedRate(rate: number) {
    this.store.dispatch(updateFixedRate({rate: rate}))
  }

  useFixedRate() {
    this.store.dispatch(useFixedRate())
  }
}

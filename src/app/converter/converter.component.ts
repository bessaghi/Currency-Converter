import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {AppState} from '../../store/app.state';
import {select, Store} from '@ngrx/store';
import {randomlyChangeRate, swapCurrency, updateAmount} from '../../store/converter/converter.actions';
import {amount, destinationCurrency, result, sourceCurrency} from '../../store/converter/converter.selectors';
import {AsyncPipe} from '@angular/common';
import {MatFabButton} from '@angular/material/button';

@Component({
  selector: 'converter',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIcon,
    AsyncPipe,
    MatFabButton
  ],
  standalone: true,
  templateUrl: './converter.component.html'
})
export class ConverterComponent implements OnInit {

  amount$: Observable<number>;
  result$: Observable<number>;
  source$: Observable<string>;
  destination$: Observable<string>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(randomlyChangeRate());
    this.amount$ = this.store.pipe(select(amount));
    this.result$ = this.store.pipe(select(result));
    this.source$ = this.store.pipe(select(sourceCurrency));
    this.destination$ = this.store.pipe(select(destinationCurrency));
  }

  onSwap() {
    this.store.dispatch(swapCurrency());
  }

  updateResult(amount: number) {
    this.store.dispatch(updateAmount({amount: amount}))
  }
}

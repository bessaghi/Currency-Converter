import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {AppState} from '../../store/app.state';
import {select, Store} from '@ngrx/store';
import {randomlyChangeAmount, swapCurrency} from '../../store/converter/converter.actions';
import {amount, result} from '../../store/converter/converter.selectors';
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

  value$: Observable<number>;
  result$: Observable<number>;

  source = 'EUR';
  destination = 'USD';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(randomlyChangeAmount());
    this.value$ = this.store.pipe(select(amount));
    this.result$ = this.store.pipe(select(result));
  }

  onSwap() {
    this.store.dispatch(swapCurrency());
    [this.source, this.destination] = [this.destination, this.source];
  }
}

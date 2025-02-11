import {Component, DestroyRef, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {rate} from '../../store/converter/converter.selectors';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {updateRate} from '../../store/converter/converter.actions';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'currency-rate',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatFabButton,
    MatIcon
  ],
  standalone: true,
  templateUrl: './currency-rate.component.html'
})
export class CurrencyRateComponent implements OnInit {

  rate: number

  constructor(private store: Store<AppState>,
              private destroyRef: DestroyRef) {
  }

  ngOnInit() {
    this.store.pipe(select(rate))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(rate => this.rate = rate);
  }

  changeRate() {
    this.store.dispatch(updateRate({rate: this.rate}))
  }
}

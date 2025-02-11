import {Component} from '@angular/core';
import {ConverterComponent} from './converter/converter.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {CurrencyRateComponent} from './currency-rate/currency-rate.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ConverterComponent,
    MatToolbar,
    MatIcon,
    CurrencyRateComponent
  ]
})
export class AppComponent {
}

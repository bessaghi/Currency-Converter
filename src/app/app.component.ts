import {Component} from '@angular/core';
import {ConverterComponent} from './converter/converter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ConverterComponent
  ]
})
export class AppComponent {
}

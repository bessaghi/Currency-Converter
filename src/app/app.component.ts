import {Component} from '@angular/core';
import {ConverterComponent} from './converter/converter.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ConverterComponent,
    MatToolbar,
    MatIcon
  ]
})
export class AppComponent {
}

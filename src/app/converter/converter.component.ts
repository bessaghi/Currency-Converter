import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {interval, map, startWith} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'converter',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule
  ],
  standalone: true,
  templateUrl: './converter.component.html'
})
export class ConverterComponent implements OnInit {

  value = 1.1;
  destroyRef = inject(DestroyRef)

  ngOnInit() {
    interval(3000).pipe(
      startWith(null),
      map(() => Math.random() * 0.1 - 0.05),
      map(randomValue => +randomValue.toFixed(3)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(randomValue => this.value += randomValue);
  }

}

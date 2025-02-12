import {Component, DestroyRef, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {NgForOf} from '@angular/common';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {Conversion} from '../../store/converter/converter.state';
import {history} from '../../store/converter/converter.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'history',
  imports: [
    MatTableModule,
    NgForOf
  ],
  standalone: true,
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

  columns = [
    {
      name: 'Real Rate',
      fieldName: 'realRate'
    },
    {
      name: 'Customized Rate',
      fieldName: 'fixedRate'
    },
    {
      name: 'Amount',
      fieldName: 'amount'
    },
    {
      name: 'Result',
      fieldName: 'result'
    }]

  displayedColumns = this.columns.map(it =>  it.name)

  dataSource = new MatTableDataSource<Conversion>()

  constructor(private store: Store<AppState>,
              private destroyRef: DestroyRef) {
  }

  ngOnInit() {
    this.store.pipe(
      select(history),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(history => this.dataSource.data = history);
  }
}

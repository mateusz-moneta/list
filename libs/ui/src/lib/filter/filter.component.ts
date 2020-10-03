import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'list-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output()
  valueChange = new EventEmitter<string>();

  control = new FormControl('');

  private unSubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.handleControl();
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  private handleControl(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(value => this.valueChange.emit(value));
  }
}

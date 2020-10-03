import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CompanySummary, ListFacade } from '@list/data-access-list';
import { CustomDataSource, tableConfig } from '@list/shared';

@Component({
  selector: 'list-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  companySummaryList$ = this.listFacade.companySummaryList$;
  dataSource: CustomDataSource<CompanySummary>;
  getCompanySummaryListInProgress$ = this.listFacade.getCompanySummaryListInProgress$;

  private unSubscribe$ = new Subject<void>();

  readonly headElements = ['ID', 'Name', 'City', 'Average Income', 'Last Month Income', 'Total Income'];
  readonly paginationConfig = tableConfig.pagination;

  constructor(private listFacade: ListFacade) {}

  ngOnInit(): void {
    this.listFacade.getCompanySummaryList();
    this.initCompanySummaryList();
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  private initCompanySummaryList(): void {
    this.companySummaryList$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(companySummaryList => {
        this.dataSource = new CustomDataSource<CompanySummary>(companySummaryList);
      });
  }
}

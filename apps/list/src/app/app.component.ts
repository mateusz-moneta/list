import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CompanySummary, ListFacade } from '@list/data-access-list';
import { CustomDataSource, FieldConfiguration, tableConfig } from '@list/shared';
import { TableComponent } from '@list/ui';

@Component({
  selector: 'list-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('listTable', { static: false }) listTable: TableComponent<CompanySummary>;

  companySummaryList$ = this.listFacade.companySummaryList$;
  dataSource: CustomDataSource<CompanySummary>;
  fieldConfiguration: FieldConfiguration[] = [
    { propertyName: 'id', name: 'ID' },
    { propertyName: 'name', name: 'Name' },
    { propertyName: 'averageIncome', name: 'Average Income' },
    { propertyName: 'lastMonthIncome', name: 'Last Month Income' },
    { propertyName: 'totalIncome', name: 'Total Income' }
  ];
  getCompanySummaryListInProgress$ = this.listFacade.getCompanySummaryListInProgress$;

  private unSubscribe$ = new Subject<void>();
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

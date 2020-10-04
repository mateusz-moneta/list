import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CompanySummary, ListFacade } from '@list/list/data-access-list';
import { FieldConfiguration } from '@list/list/domain';
import { TableComponent } from '@list/list/ui-table';
import { tableConfig } from '@list/list/config';
import { CustomDataSource } from '@list/list/util-data-table';

@Component({
  selector: 'list-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
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
  filterValue: string;
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

  onFilterValueChange(filterValue: string): void {
    this.filterValue = filterValue;
  }


  private initCompanySummaryList(): void {
    this.companySummaryList$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(companySummaryList => {
        this.dataSource = new CustomDataSource<CompanySummary>(companySummaryList);
      });
  }
}

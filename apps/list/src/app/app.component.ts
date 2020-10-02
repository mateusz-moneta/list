import { Component, OnInit } from '@angular/core';

import { ListFacade } from '@list/data-access-list';

@Component({
  selector: 'list-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  companySummaryList$ = this.listFacade.companySummaryList$;

  constructor(private listFacade: ListFacade) {}

  ngOnInit(): void {
    this.listFacade.getCompanySummaryList();
  }
}

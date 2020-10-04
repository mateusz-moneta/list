import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CustomPageComponent } from '../custom-page/custom-page.component';
import { PageEvent } from '@list/list/domain';

@Component({
  selector: 'list-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild('customPagesContainer', { read: ViewContainerRef, static: true })
  entry: ViewContainerRef;

  @Input()
  length = 0;

  @Input()
  pageIndex: number;

  @Input()
  pageSize: number;

  @Input()
  pageSizeOptions: number[];

  @Input()
  set showTotalPages(value: number) {
    this._showTotalPages = value % 2 === 0 ? value + 1 : value;
  }

  get showTotalPages(): number {
    return this._showTotalPages;
  }

  @Output()
  page = new EventEmitter<PageEvent>();

  pageSizeOption = new FormControl(10);

  currentPage = 0;

  private _unsubscribe$ = new Subject<void>();
  private _rangeStart: number;
  private _rangeEnd: number;
  private _showTotalPages = 5;

  constructor(private _resolver: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.length && changes.length.currentValue) {
      this.length = changes.length.currentValue;
    }

    this._initPageRange();
  }

  ngOnInit(): void {
    this._handlePageSizeOption();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  firstPage(): void {
    this.switchPage(0);
  }

  lastPage(): void {
    this.switchPage(this.lastIndex);
  }

  switchPage(currentPage: number): void {
    this.currentPage = currentPage;
    this.pageIndex = currentPage;
    this.page.emit({ pageIndex: this.pageIndex, pageSize: this.pageSizeOption.value, length: this.length });
    this._initPageRange();
  }

  get lastIndex(): number {
    return Math.floor(this.length / this.pageSize) - 1;
  }

  private _buildCustomPages(): void {
    if (this.entry && this.entry.length) {
      this.entry.clear();
    }

    for (let index = 0; index < this._getNumberOfPages(); index = index + 1) {
      if (this._shouldRenderButton(index)) {
        const customPage = this._createCustomPage(index);
        this._handleSelectPage(customPage);
      }
    }
  }

  private _createCustomPage(index: number): ComponentRef<CustomPageComponent> {
    const factory = this._resolver.resolveComponentFactory(CustomPageComponent),
      component = this.entry.createComponent(factory);

    component.instance.index = index;
    component.instance.isSelected = this._isSelected(index);

    return component;
  }

  private _getNumberOfPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  private _handlePageSizeOption(): void {
    this.pageSizeOption.valueChanges.pipe(takeUntil(this._unsubscribe$)).subscribe((pageSize: number) => {
      this.pageSize = pageSize;

      if (pageSize * this.pageIndex > this.length) {
        this.pageIndex = Math.floor(this.length / pageSize);
      }

      this.switchPage(this.pageIndex);
    });
  }

  private _handleSelectPage(customPage: ComponentRef<CustomPageComponent>): void {
    customPage.instance.selectPage.subscribe((currentPage: number) => {
      this.switchPage(currentPage);
    });
  }

  private _initPageRange(): void {
    this._rangeStart = this.currentPage - this.showTotalPages / 2;
    this._rangeEnd = this.currentPage + this.showTotalPages / 2;

    this._buildCustomPages();
  }

  private _isSelected(index: number): boolean {
    return index === this.pageIndex;
  }

  private _shouldRenderButton(index: number): boolean {
    return (
      (index < this.showTotalPages && this.currentPage < this.showTotalPages && index > this._rangeStart) ||
      (index >= this._rangeStart && index <= this._rangeEnd)
    );
  }
}

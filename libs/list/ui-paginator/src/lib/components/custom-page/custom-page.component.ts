import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'list-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent {
  @Input()
  index: number;

  @Input()
  isSelected = false;

  @Output()
  selectPage = new EventEmitter<number>();

  selectPageAction(): void {
    this.selectPage.emit(this.index);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  @Input({ required: true }) categories!: string[];
  @Output() categoryChange = new EventEmitter();

  onCategoryChange(category: string) {
    this.categoryChange.emit(category);
  }
}

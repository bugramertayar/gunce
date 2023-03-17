import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownOptionModel } from './model/dropdown-option.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() optionList: DropdownOptionModel[] = [];
  @Input() selectedValue: number = 0;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Output() dropdownValueChanged: EventEmitter<number>;

  constructor() {
    this.dropdownValueChanged = new EventEmitter();
  }

  ngOnInit(): void {}

  valueChanged(value: any): void {
    this.selectedValue = value;
    this.dropdownValueChanged.emit(value);
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() backgroundType: string = 'filled';
  @Input() color: string = 'blue';
  @Input() rounded: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}

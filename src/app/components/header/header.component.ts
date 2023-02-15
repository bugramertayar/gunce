import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  changeToDarkMode(changeToDarkMode: boolean) {
    if (changeToDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('mode', 'dark-mode');
      this.isDarkMode = true;
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('mode', 'light-mode');
      this.isDarkMode = false;
    }
  }
}

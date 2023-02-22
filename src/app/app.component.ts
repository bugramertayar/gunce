import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gunce';

  showHeader: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('mode') === 'dark-mode') {
      this.changeToDarkMode(true);
    } else {
      this.changeToDarkMode(false);
    }
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/register') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  changeToDarkMode(changeToDarkMode: boolean) {
    if (changeToDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('mode', 'dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('mode', 'light-mode');
    }
  }
}

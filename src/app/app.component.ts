import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="row logo-top">
      <img class="center-block img-responsive" src="/assets/img/ja.png">
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
